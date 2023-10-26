'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
const LoginBtn = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="h-max">
        <p className="text-center text-base text-red-600">Untuk mengakses fitur ini silahkan login terlebih dahulu</p>
        <div className="flex justify-center my-2">
          <button onClick={() => router.push('/login')} type="button" className="shadow-md rounded-2xl px-6 py-2 bg-primary text-white font-semibold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBtn;
