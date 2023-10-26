import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
// import { File } from 'buffer';
import imagekit from '@/libs/imagekit';
import { Category } from '@prisma/client';

export const maxDuration = 60;

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });
    }
    const { body, category, imageBase64 } = await req.json();

    if (!body || !category) return NextResponse.json({ success: false, message: 'Body and category is required', data: null }, { status: 400 });

    if (imageBase64 !== '') {
      const { url } = await imagekit.upload({
        file: imageBase64,
        fileName: Date.now().toString(),
        folder: '/forum-amikom/posts',
      });

      const post = await prisma.posts.create({
        data: {
          body: body,
          category: category as Category,
          image: url,
          student: {
            connect: {
              email: session?.user?.email!,
            },
          },
        },
      });
      return NextResponse.json({ success: true, message: 'Create post successfully', data: post }, { status: 201 });
    }

    const post = await prisma.posts.create({
      data: {
        body: body,
        category: category as Category,
        student: {
          connect: {
            email: session?.user?.email!,
          },
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Create post successfully', data: post }, { status: 201 });
  } catch (error: any) {
    console.error(error);
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
        image: true,
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
