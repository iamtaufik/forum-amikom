'use client';
import Error from '@/components/Error';
import Label from '@/components/Label';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import NavbarBtm from '@/components/NavbarBtm';
import Post from '@/components/Post';
import fetcher from '@/libs/fetcher';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const categories = ['Terbaru', 'UKM', 'AMIKOM', 'Berita', 'Saran'];

interface Post {
  id: number;
  body: string;
  image?: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: number;
    name: string;
    email: string;
    profile: { imageProfile: string };
  };
}

const Home = () => {
  const [isActive, setIsActive] = useState<string>('Terbaru');
  const { data, isLoading, error } = useSWR<Post[]>('/api/posts', fetcher);
  const { mutate } = useSWRConfig();

  return (
    <div className="container min-h-screen max-w-lg px-4 pb-6 bg-gray ">
      <Navbar />
      <div className="flex justify-between gap-x-2 overflow-x-auto py-2">
        {categories.map((category) => (
          <Label key={category} text={category} className={`${isActive === category ? 'text-white bg-secondary' : 'text-dark bg-white '}`} onClick={() => setIsActive(category)} />
        ))}
      </div>
      <div className="mt-4 mb-12 flex flex-col gap-4">
        {error && (
          <Error
            title="Gagal memuat postingan"
            description="Silahkan coba lagi"
            action={
              <button onClick={() => mutate(`/api/posts`)} className="text-white px-4 p-2 rounded-xl font-semibold bg-primary">
                Coba lagi
              </button>
            }
          />
        )}
        {isLoading && <Loading />}
        {isActive !== 'Terbaru' &&
          data &&
          data
            .filter((post) => post.category === isActive)
            .map((post) => <Post key={post.id} name={post.student.name} description={post.body} id={post.id} profilePicture={post.student.profile?.imageProfile ?? '/blank-profile.png'} imagePost={post.image ?? ''} />)}

        {isActive === 'Terbaru' &&
          data &&
          data.map((post) => <Post key={post.id} name={post.student.name} description={post.body} id={post.id} profilePicture={post.student.profile?.imageProfile ?? '/blank-profile.png'} imagePost={post.image ?? ''} />)}
      </div>
      <NavbarBtm />
    </div>
  );
};

export default Home;
