'use client';
import Comment from '@/components/Comment';
import InputComment from '@/components/InputComment';
import Post from '@/components/Post';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import LoginBtn from '@/components/LoginBtn';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import fetcher from '@/libs/fetcher';
import Error from '@/components/Error';

interface Comment {
  id: number;
  body: string;
  student: {
    name: string;
    email: string;
    profile: {
      imageProfile?: string;
    };
  };
}

interface Post {
  id: number;
  body: string;
  image?: string;
  student: {
    name: string;
    email: string;
    profile: {
      imageProfile?: string;
    };
  };
}

interface IProps {
  postId: string;
}

const Comments = ({ postId }: IProps) => {
  const [post, setPost] = useState<Post>();
  const [body, setBody] = useState('');
  const { data: sessions, status } = useSession();
  const { data, isLoading, error } = useSWR<Comment[]>(`/api/posts/${postId}/comments`, fetcher);
  const { mutate } = useSWRConfig();

  if (status === 'unauthenticated') {
    return (
      <div className="bg-gray px-4 h-screen pb-4 container max-w-lg">
        <LoginBtn />;
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      if (body === '') return false;
      await axios.post(`/api/posts/${postId}/comments`, {
        body,
      });
      setBody('');
      mutate(`/api/posts/${postId}/comments`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getPost = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      console.log(data.data);
      setPost(data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <div className="bg-gray container min-h-screen max-w-lg px-4 pb-6 flex items-center flex-col ">
        <div className="flex justify-start w-full my-2 px-4">
          <Link href={'/'} className="w-max">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8  text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </div>
          </Link>
        </div>
        <div className="w-full flex px-4 flex-col items-center ">
          <Post
            name={post?.student?.name ?? ''}
            description={post?.body ?? ''}
            id={post?.id ?? 0}
            profilePicture={post?.student?.profile?.imageProfile ?? '/blank-profile.png'}
            imagePost={post?.image ?? ''}
            isBtnComment={false}
            className="w-full"
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-4 px-4 mb-16">
          {error && (
            <Error
              title="Gagal memuat komentar"
              description="Silahkan coba lagi"
              action={
                <button onClick={() => mutate(`/api/posts/${postId}/comments`)} className="text-white px-4 p-2 rounded-xl font-semibold bg-primary">
                  Coba lagi
                </button>
              }
            />
          )}
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          {data && data.length === 0 && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-primary font-semibold">Belum ada komentar</span>
              <span className="text-slate-400">Jadilah orang pertama yang berkomentar</span>
            </div>
          )}
          {data &&
            data.map((comment) => (
              <div className={`flex  w-full ${comment.student.email === sessions?.user?.email ? 'justify-end' : 'justify-start'}`}>
                <Comment
                  id={comment.id}
                  name={comment.student.name}
                  profilePicture={comment.student.profile?.imageProfile ?? '/blank-profile.png'}
                  content={comment.body}
                  order={comment.student.email !== sessions?.user?.email ? 'left' : 'right'}
                />
              </div>
            ))}
        </div>
        <InputComment body={body} setBody={setBody} handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default Comments;
