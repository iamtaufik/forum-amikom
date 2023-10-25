import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/libs/prisma';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });
    const student = await prisma.students.findUnique({ where: { email: session?.user?.email! }, include: { profile: true, posts: true, comments: true } });

    return NextResponse.json({ success: true, message: 'Get profile succesfully', data: student }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
