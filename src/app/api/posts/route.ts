import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });
    const { content, category } = await req.json();
    const student = await prisma.students.findUnique({ where: { email: session?.user?.email! } });
    const post = await prisma.posts.create({
      data: {
        body: content,
        category,
        student: {
          connect: {
            id: student?.id,
          },
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Create post succesfully', data: post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        body: true,
        category: true,
        createdAt: true,
        updatedAt: true,
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

    return NextResponse.json({ success: true, message: 'Get posts succesfully', data: posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
