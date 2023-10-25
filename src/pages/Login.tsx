'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    if (email === '' || password === '') return false;
    setIsLoading(true);
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
      .then((resp) => {
        console.log(resp);
        if (resp?.ok) router.push('/');
        if (resp?.error && resp.status === 401) setErrorMsg('Email atau password salah');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container min-h-screen max-w-lg px-4 bg-gray">
      <div className="flex justify-center py-16">
        <Image src={'/forum-amikom-logo.webp'} alt="logo" width="150" height="150" className="shadow-xl rounded-md" />
      </div>
      <div className="mb-10">
        <h2 className="text-3xl text-primary font-semibold">Welcome Back!</h2>
        <p className="text-sm ">Masuk menggunakan akun kamu</p>
      </div>
      {errorMsg && <p className="text-red-500 text-center my-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
        <div>
          <input className="px-6 py-2 w-full shadow-md text-base rounded-3xl outline-primary ring-2 ring-primary" type="email" placeholder="Email amikom kamu" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <input className="px-6 py-2 w-full shadow-md text-base rounded-3xl outline-primary ring-2 ring-primary" type="password" placeholder="Kata sandi" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="w-max shadow-md bg-primary text-white font-semibold px-10 py-2 rounded-3xl" disabled={isLoading}>
            {isLoading ? 'Loading' : 'Sign In'}
          </button>
        </div>
      </form>
      <p className="text-center my-4">Atau</p>
      <div className="flex justify-center">
        <button className="w-max shadow-md bg-white text-primary font-semibold px-10 py-2 rounded-3xl" onClick={() => signIn('google', { callbackUrl: '/' })}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
