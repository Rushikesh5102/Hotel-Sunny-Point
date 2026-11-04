# HOTEL SUNNY POINT — PRODUCTION AUTHENTICATION IMPLEMENTATION SPECIFICATION
*Supabase Auth, SSR Session Management, Route Protection Middleware & RBAC Verification*

---

## 1. Overview & Architectural Migration

This document outlines the transition from the simulated client-side stub in `src/app/admin/login/page.tsx` to enterprise-grade authentication utilizing **Supabase Auth** and **`@supabase/ssr`** within Next.js 15 App Router.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS 15 APP ROUTER                           │
│                                                                        │
│   Incoming Request: /admin/menu                                        │
│          │                                                             │
│          ▼                                                             │
│   src/middleware.ts ──► src/lib/supabase/middleware.ts                 │
│          │                                                             │
│          ├── 1. Read encrypted session cookies                         │
│          ├── 2. Refresh JWT with Supabase Auth API (GoTrue)            │
│          ├── 3. If unauthenticated ──► Redirect 307 /admin/login       │
│          └── 4. If authenticated   ──► Forward to Server Components    │
│                                              │                         │
│                                              ▼                         │
│                              src/app/admin/layout.tsx                  │
│                              (Verifies admin_profiles role)            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Required Core Dependencies

The following production dependencies must be installed when Phase 4 implementation is initiated:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

## 3. Implementation Code Specifications

### 3.1 Browser Client (`src/lib/supabase/client.ts`)
Creates a browser-scoped client that reads/writes session cookies and listens to authentication events:
```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 3.2 Server Client (`src/lib/supabase/server.ts`)
Creates a server-side client for Server Components, Server Actions, and Route Handlers:
```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // Handled safely by middleware.
          }
        },
      },
    }
  );
}
```

### 3.3 Middleware Session Sync (`src/lib/supabase/middleware.ts`)
Refreshes access tokens and keeps auth cookies synchronized:
```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid using supabase.auth.getSession() in middleware as it is insecure
  // supabase.auth.getUser() validates the token against Supabase Auth servers
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Case 1: Unauthenticated user attempting to access protected admin pages
  if (isAdminRoute && !isLoginPage && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirectedFrom", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Case 2: Authenticated user attempting to visit login page
  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

### 3.4 Root Middleware (`src/middleware.ts`)
Mounts the session updater across all admin routes:
```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|assets|screenshots|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

## 4. Production Admin Login Component (`src/app/admin/login/page.tsx`)

Replaces the mock `setTimeout` with genuine Supabase credential validation:

```typescript
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRestaurant } from "@/context/RestaurantContext";
import { createClient } from "@/lib/supabase/client";
import { Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/admin";
  const { restaurant } = useRestaurant();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || "Invalid credentials. Please verify your email and password.");
      setLoading(false);
      return;
    }

    if (data?.user) {
      // Verify admin profile and tenant authorization
      const { data: profile, error: pError } = await supabase
        .from("admin_profiles")
        .select("role, is_active, restaurant_id")
        .eq("user_id", data.user.id)
        .eq("is_active", true)
        .single();

      if (pError || !profile) {
        await supabase.auth.signOut();
        setErrorMessage("Access denied: No active administrator profile exists for this account.");
        setLoading(false);
        return;
      }

      // Successful authorization
      router.push(redirectedFrom);
      router.refresh();
    }
  };

  return (
    // Render production login interface with error alerts and real form validation...
  );
}
```

---

## 5. Logout & Session Termination

In `src/app/admin/layout.tsx`:
```typescript
const handleLogout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  router.push("/admin/login");
  router.refresh();
};
```

This guarantees:
1. Revocation of the current JWT session with Supabase GoTrue.
2. Deletion of all session cookies in the browser.
3. Middleware instantly intercepts any subsequent back-button navigation and redirects to `/admin/login`.
