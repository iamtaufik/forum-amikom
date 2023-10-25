import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from './api/auth/[...nextauth]/route';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/profile', '/posts', '/posts/create', '/api/posts/:path*', '/api/profile/:path*'],
};

// export default async function middleware(req: NextRequest) {
//   const sessions = await getServerSession(authOptions);
//   if (!sessions) return Response.json({ success: false, message: 'authentication failed' }, { status: 401 });
//   return NextResponse.next();
// }
