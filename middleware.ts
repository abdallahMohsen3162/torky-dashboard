// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log(`[LOG] ${request.method} ${request.url}`);
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // apply to all routes
};
