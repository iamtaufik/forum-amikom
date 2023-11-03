import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/libs/prisma';
import imagekit from '@/libs/imagekit';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });
    const student = await prisma.students.findUnique({ where: { email: session?.user?.email! }, include: { profile: true, posts: true, comments: true } });
    if (!student) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });

    return NextResponse.json({ success: true, message: 'Get profile succesfully', data: student }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });
    const student = await prisma.students.findUnique({ where: { email: session?.user?.email! }, include: { profile: true, posts: true, comments: true } });
    if (!student) return NextResponse.json({ success: false, message: 'Unauthorized', data: null }, { status: 401 });

    const { name, imageBase64,imageId, nim } = await req.json();
    if (imageBase64 !== '') {
      if (imageId !== '') {
        await imagekit.deleteFile(imageId);
      }
      const { url } = await imagekit.upload({
        file: imageBase64,
        fileName: Date.now().toString(),
        folder: '/forum-amikom/profiles',
      });

      const studentProfiles = await prisma.students.update({
        where: {
          id: student.id,
        },
        data: {
          name,
          profile: {
            update: {
              nim,
              imageProfile: url,
            },
          },
        },
      });

      return NextResponse.json({ success: true, message: 'Update profile succesfully', data: { ...studentProfiles } }, { status: 200 });
    }

    const studentProfile = await prisma.students.update({
      where: {
        id: student.id,
      },
      data: {
        name,
        profile: {
          update: {
            nim,
          },
        },
      },
    });

    return NextResponse.json({ success: true, message: 'Update profile succesfully', data: { ...studentProfile } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
