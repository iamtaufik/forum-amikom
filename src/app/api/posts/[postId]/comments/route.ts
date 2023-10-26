import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const POST = async (req: NextRequest, context: { params: { postId: string } }) => {
  try {
    const session = await getServerSession(authOptions);
    const { postId } = context.params;
    const { body } = await req.json();

    const student = await prisma.students.findFirst({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!student) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });

    const data = await prisma.comments.create({
      data: {
        body: body,
        post: {
          connect: {
            id: Number(postId),
          },
        },
        student: {
          connect: {
            id: student.id,
          },
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Create comment succesfully', data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const GET = async (req: NextRequest, context: { params: { postId: string } }) => {
  try {
    const session = await getServerSession(authOptions);
    const { postId } = context.params;
    const student = await prisma.students.findFirst({
      where: {
        email: session?.user?.email!,
      },
    });

    if (!student) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });

    const data = await prisma.comments.findMany({
      where: {
        post: {
          id: Number(postId),
        },
      },
      orderBy: {
        createdAt: 'asc',
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

    // return NextResponse.json({ msg: 'ok' });
    return NextResponse.json({ success: true, message: 'Get comment succesfully', data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
