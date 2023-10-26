'use client';
import Label from '@/components/Label';
import Navbar from '@/components/Navbar';
import NavbarBtm from '@/components/NavbarBtm';
import Post from '@/components/Post';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const categories = ['Terbaru', 'UKM', 'AMIKOM', 'Berita', 'Saran'];

type Post = {
  id: number;
  body: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: number;
    name: string;
    email: string;
    profile: { imageProfile: string };
  };
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isActive, setIsActive] = useState('Terbaru');

  const getPosts = async () => {
    try {
      const { data } = await axios.get('/api/posts');
      console.log(data.data);
      setPosts(data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="container min-h-screen max-w-lg px-4 pb-6 bg-gray ">
      <Navbar />
      <div className="flex justify-between gap-x-2 overflow-x-auto py-2">
        {categories.map((category) => (
          <Label key={category} text={category} className={`${isActive === category ? 'text-white bg-secondary' : 'text-dark bg-white '}`} onClick={() => setIsActive(category)} />
        ))}
      </div>
      <div className="mt-4 mb-12 flex flex-col gap-4">
        {isActive !== 'Terbaru' &&
          posts
            .filter((post) => post.category === isActive)
            .map((post) => (
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
              />
            ))}

        {isActive === 'Terbaru' &&
          posts.map((post) => (
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
            />
          ))}
      </div>
      <NavbarBtm />
    </div>
  );
};

export default Home;
