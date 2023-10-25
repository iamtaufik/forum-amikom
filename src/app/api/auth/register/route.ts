import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/libs/prisma';
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { name, email, password } = await req.json();

    const isExistUser = await prisma.students.findFirst({ where: { email } });

    if (isExistUser) return NextResponse.json({ success: false, message: 'Email already exist use singin with google', data: null }, { status: 400 });

    const user = await prisma.students.create({ data: { name, email, password: await bcrypt.hash(password, 10) } });

    return NextResponse.json({ success: true, message: 'Register succesfully', data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};
