'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';

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

const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getMyPosts = async () => {
    try {
      const { data } = await axios.get('/api/profile/posts');
      setPosts(data.data.posts);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);
  return (
    <>
      {posts.length === 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary font-semibold">Belum ada postingan</span>
          <span className="text-slate-400">Buat postingan pertama anda</span>
        </div>
      )}
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.student.name
            .split(' ')
            .filter((w) => w !== post.student.name.split(' ')[post.student.name.split(' ').length - 1])
            .join(' ')}
          description={post.body}
          id={post.id}
          profilePicture={post.student.profile?.imageProfile ?? '/blank-profile.png'}
          imagePost={post.image ?? ''}
          className="w-4/5"
        />
      ))}
    </>
  );
};

export default PostsList;
