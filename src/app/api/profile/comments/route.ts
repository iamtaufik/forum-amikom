import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/libs/prisma';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });
    const comments = await prisma.comments.findMany({
      where: {
        student: {
          email: session?.user?.email!,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        student: {
          select: {
            name: true,
            email: true,
            profile: {
              select: {
                imageProfile: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Get profile succesfully', data: { comments } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
