'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import useSWR from 'swr';
import Loading from './Loading';
import Error from './Error';

type Post = {
  id: number;
  body: string;
  image?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  student: {
    name: string;
    email: string;
    profile: { imageProfile: string };
  };
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data.posts);

const PostsList = () => {
  const { data, isLoading, error, mutate } = useSWR<Post[]>('/api/profile/posts', fetcher);

  return (
    <>
      {error && (
        <Error
          title="Gagal memuat data"
          description="Terjadi kesalahan saat memuat data"
          action={
            <button onClick={() => mutate()} className="bg-primary text-white px-4 py-2 rounded-md">
              Coba lagi
            </button>
          }
        />
      )}
      {isLoading && <Loading />}
      {data && data.length === 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary font-semibold">Belum ada postingan</span>
          <span className="text-slate-400">Buat postingan pertama anda</span>
        </div>
      )}
      {data &&
        data.map((post) => <Post key={post.id} name={post.student.name} description={post.body} id={post.id} profilePicture={post.student.profile?.imageProfile ?? '/blank-profile.png'} imagePost={post.image ?? ''} className="w-4/5" />)}
    </>
  );
};

export default PostsList;
