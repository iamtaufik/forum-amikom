'use client';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';

type Post = {
  id: number;
  body: string;
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
      const { data } = await axios.get('/api/posts/me');
      console.log(data);
      setPosts(data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.student.name
            .split(' ')
            .filter((w) => w !== post.student.name.split(' ')[post.student.name.split(' ').length - 1])
            .join(' ')}
          description={post.body}
          id={post.id}
          profilePicture={post.student.profile?.imageProfile ?? ''}
          imagePost="https://source.unsplash.com/random/350x200/?laptop"
          className="w-4/5"
        />
      ))}
    </>
  );
};

export default PostsList;
