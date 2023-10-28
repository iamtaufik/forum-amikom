'use client';
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
      <p className="text-center my-4 gap-4">Atau</p>
      <div className="flex justify-center">
        <button className="w-max shadow-md bg-white text-primary flex font-semibold px-4 py-2 rounded-3xl" onClick={() => signIn('google', { callbackUrl: '/' })}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 px-3" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
          </svg>
          Sign In with Google
        </button>
        <button className="w-max text-primary font-semibold px-4 py-2 rounded-3xl" onClick={() => router.push('/signup')}>
          <p className="underline">Buat akun baru</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
