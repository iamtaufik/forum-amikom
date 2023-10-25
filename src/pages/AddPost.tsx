'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const tags = [
  {
    id: 1,
    name: 'UKM',
  },
  {
    id: 2,
    name: 'AMIKOM',
  },
  {
    id: 3,
    name: 'Berita',
  },
  {
    id: 4,
    name: 'Saran',
  },
];

const AddPost = () => {
  const { data: sessions } = useSession();
  const [isActive, setIsActive] = useState<number>(0);
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const createPostHandler = async () => {
    if (content === '' || isActive === 0) return false;
    try {
      await axios.post('/api/posts', {
        content,
        category: tags.find((tag) => tag.id === isActive)?.name,
      });

      router.push('/');
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-gray px-4 min-h-screen pb-4 container max-w-lg">
      <div className="flex justify-between items-center pt-4">
        <Link href={'/'}>
          <div className={`p-2 rounded-full border`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
        <div>
          <span className={`text-lg px-8 py-2 rounded-2xl  ${content !== '' && isActive !== 0 ? 'bg-primary text-white' : 'bg-[#ececec] text-slate-400 '} `} onClick={() => createPostHandler()}>
            Post
          </span>
        </div>
      </div>
      <div className="mt-6 bg-white py-4 px-2 rounded-xl">
        <div className=" flex gap-4 ">
          <div>
            <Image className=" rounded-full p-1 bg-primary" width={50} height={50} alt={sessions?.user?.name ?? ''} src={sessions?.user?.image ?? ''} />
          </div>
          <div className="w-3/4">
            <textarea onChange={(e) => setContent(e.target.value)} placeholder="Apa yang sedang terjadi?" className=" py-2 text-base rounded-lg focus-visible:outline-primary focus-visible:ring-1 w-full h-36 px-2"></textarea>
          </div>
        </div>
        <div className="my-4">{isUploadImage && <Image width={350} height={200} className="w-full rounded-2xl" src={'https://source.unsplash.com/random/350x200/?laptop'} alt={'laptop'} />}</div>
        <div className="my-4">
          <div className={`shadow-md rounded-full w-max flex justify-center items-center ${isUploadImage ? 'bg-secondary text-white' : 'bg-white text-primary'}`} onClick={() => setIsUploadImage(!isUploadImage)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-2 ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Tags:</h3>
          <ul className="flex gap-4 flex-wrap">
            {tags.map((tag) => (
              <li key={tag.id} className={` flex items-center p-2 shadow-md  w-max rounded-xl ${isActive === tag.id ? 'bg-secondary text-white' : ''}`}>
                <input type="checkbox" id={tag.name} className="w-4 h-4 outline-gray " onChange={(e) => setIsActive(tag.id)} checked={isActive === tag.id} />
                <label htmlFor={tag.name} className="mx-2 ">
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
