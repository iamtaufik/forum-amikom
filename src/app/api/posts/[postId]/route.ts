import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async (req: NextRequest, context: { params: { postId: string } }) => {
  try {
    const { postId } = context.params;
    const post = await prisma.posts.findFirst({
      where: {
        id: Number(postId),
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

    if (!post) return NextResponse.json({ success: false, message: 'Post not found', data: null }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Get comment succesfully', data: post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
