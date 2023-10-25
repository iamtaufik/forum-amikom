'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (email === '' || name === '' || password === '') return false;
      setIsLoading(true);
      await axios.post('/api/auth/register', {
        email,
        name,
        password,
      });
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container min-h-screen max-w-lg px-4 bg-gray">
      <div className="flex justify-center py-16">
        <Image src={'/forum-amikom-logo.webp'} alt="logo" width="150" height="150" className="shadow-xl rounded-md" />
      </div>
      <h2 className="text-3xl text-primary font-semibold">Welcome!</h2>
      <p className="text-sm">Buat akun kamu untuk mengakses forum amikom</p>
      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
        <div>
          <input className="px-6 py-2 w-full shadow-md text-base rounded-3xl outline-primary ring-2 ring-primary" type="email" placeholder="Email amikom kamu" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input className="px-6 py-2 w-full shadow-md text-base rounded-3xl outline-primary ring-2 ring-primary" type="text" placeholder="Nama kamu" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input className="px-6 py-2 w-full shadow-md text-base rounded-3xl outline-primary ring-2 ring-primary" type="password" placeholder="Kata sandi" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="w-max shadow-md bg-primary text-white font-semibold px-10 py-2 rounded-3xl" disabled={isLoading}>
            {isLoading ? 'Loading' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
