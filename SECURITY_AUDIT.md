# HOTEL SUNNY POINT — SECURITY & AUTHENTICATION AUDIT
*Threat Assessment, Vulnerability Analysis & Production Supabase Auth Roadmap*

---

## 1. Executive Notice

> [!WARNING]
> **CRITICAL SECURITY ADVISORY: DEMONSTRATION AUTHENTICATION IN USE**  
> The current administrative login mechanism in `src/app/admin/login/page.tsx` is a **purely simulated client-side mock** designed strictly for static evaluation and local demonstration. It possesses **zero cryptographic security**, performs no server-side credential verification, issues no cryptographic session tokens, and enforces no route protection.  
> **Under no circumstances should the current implementation be exposed to a public production domain without implementing the Supabase Authentication blueprint specified in Section 4.**

---

## 2. Existing Authentication Mechanism Review

### 2.1 Code Inspection (`src/app/admin/login/page.tsx`)
```typescript
// Lines 13-24 of src/app/admin/login/page.tsx
const [email, setEmail] = useState("admin@hotelsunnypoint.com");
const [password, setPassword] = useState("SunnyPoint1965!");
const [loading, setLoading] = useState(false);

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    router.push("/admin");
  }, 600);
};
```

### 2.2 Mechanism Classification
- **Authentication Type**: **100% Simulated Client-Side Stub**.
- **Backend Verification**: None. The form intercepts the submit event, delays for 600 milliseconds using `setTimeout`, and redirects to `/admin` regardless of what email or password was entered.
- **Session Tokens**: No cookies (`Set-Cookie`), no JWTs, no Bearer tokens, and no session identifiers are created or verified.

---

## 3. Comprehensive Vulnerability Analysis

| Vulnerability ID | Vulnerability Title | Severity | Technical Details & Impact |
|:---|:---|:---:|:---|
| **VULN-01** | **Unprotected Administrative Endpoints** | **CRITICAL** | Any client can directly navigate to `/admin`, `/admin/menu`, `/admin/categories`, `/admin/promotions`, `/admin/feedback`, or `/admin/settings` by typing the URL into the browser. No middleware or route guard exists to intercept unauthorized traffic. |
| **VULN-02** | **Simulated Client-Side Authentication Bypass** | **CRITICAL** | Submitting any string or empty value in `/admin/login` triggers `router.push("/admin")`. An attacker does not need credentials to trigger the redirect. |
| **VULN-03** | **Hardcoded Demonstration Credentials in Source** | **HIGH** | Default credentials (`admin@hotelsunnypoint.com` / `SunnyPoint1965!`) are baked directly into client-side JavaScript bundles and visible in DevTools source inspection. |
| **VULN-04** | **Unrestricted Client Mutation Capabilities** | **HIGH** | All data mutation methods (`restaurantRepo.updateMenuItem`, `restaurantRepo.deleteMenuItem`, etc.) execute directly in the browser against `localStorage`. There is no authorization check verifying whether the user is a verified tenant owner. |
| **VULN-05** | **Absence of Rate Limiting & Brute-Force Protection** | **MEDIUM** | The login form lacks rate limiting, CAPTCHA, or IP throttling. In a production environment without middleware, this allows automated credential stuffing. |
| **VULN-06** | **Lack of CSRF & Session Invalidation** | **MEDIUM** | Because there is no session state, there is no session logout, no token expiration, and no CSRF protection on mutation triggers. |

---

## 4. Production Supabase Authentication Architecture

To transition from the demonstration stub to an enterprise-grade restaurant SaaS platform, the following architecture must be deployed in Phase 4:

```
[ User Browser ]
      │
      ├── (1) POST /auth/v1/token (Supabase Auth API)
      ▼
[ Supabase Auth (GoTrue) ] ── (Issues Secure HTTP-Only JWT Cookie)
      │
      ▼
[ Next.js Middleware (`src/middleware.ts`) ]
      ├── Intercepts all `/admin/*` routes
      ├── Validates JWT & Refreshes Session via `@supabase/ssr`
      ├── Queries `admin_profiles` table for `role` & `restaurant_id`
      │
      ├── If Valid & Role in ('super_admin', 'store_manager') ──► Allow Next.js Route
      └── If Invalid / Expired ───────────────────────────────► Redirect to `/admin/login`
```

### 4.1 Required Database RBAC Schema (`admin_profiles`)
```sql
-- Role Enum Definition
CREATE TYPE user_role AS ENUM ('super_admin', 'store_manager', 'kitchen_display', 'viewer');

-- Admin Profiles Table (Linked to Supabase auth.users)
CREATE TABLE public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'store_manager',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_restaurant UNIQUE (user_id, restaurant_id)
);

-- Enable Row Level Security
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own admin profile"
    ON public.admin_profiles
    FOR SELECT
    USING (auth.uid() = user_id);
```

### 4.2 Next.js Route Protection Middleware (`src/middleware.ts`)
```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Guard all /admin routes except /admin/login
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect logged-in admin away from /admin/login to /admin
  if (request.nextUrl.pathname === "/admin/login" && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

### 4.3 Key Separation & Secrets Management
- **`NEXT_PUBLIC_SUPABASE_URL`**: Public API URL. Safe for browser code.
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Public Anonymous API Key. Safe for browser code because all operations are constrained by Supabase Row Level Security (RLS).
- **`SUPABASE_SERVICE_ROLE_KEY`**: **RESTRICTED ROOT KEY**. Must **never** be prefixed with `NEXT_PUBLIC_` and must **never** be imported into React client components. Exclusively utilized in server-only routes (`src/app/api/...`) or database seed migration scripts.

---

## 5. Security Audit Verdict

1. **Demonstration Readiness**: **APPROVED**. The simulated login is clearly labeled with an in-UI badge: `"Demonstration Access: Pre-configured for evaluation"`.
2. **Production Readiness**: **BLOCKED** until Supabase Auth, the `admin_profiles` table, and `src/middleware.ts` are implemented.
