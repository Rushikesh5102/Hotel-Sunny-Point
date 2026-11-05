import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const startTime = Date.now();

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  const payload = {
    status: "healthy",
    service: "hotel-sunny-point",
    version: "1.0.0",
    restaurant: "Hotel Sunny Point — Bhadrawati",
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`,
    environment: process.env.NODE_ENV || "production",
    checks: {
      server: "operational",
      database: "reactive_local_and_supabase_ready",
      memoryUsage: process.memoryUsage ? {
        heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      } : "n/a",
    },
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "application/json",
    },
  });
}
