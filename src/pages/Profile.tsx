'use client';
import CommentsList from '@/components/CommentsList';
import PostsList from '@/components/PostsList';
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import LoginBtn from '@/components/LoginBtn';
const Profile = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') return <LoginBtn />;

  return (
    <>
      <div className="w-full pt-4  bg-white flex flex-col gap-4 ">
        <div className="flex px-4 justify-between items-center">
          <h2 className="text-2xl text-primary font-bold">Profile</h2>
          <div className="flex items-center bg-red-600 py-2 px-4 text-white rounded-2xl gap-2" onClick={() => signOut()}>
            <span className="">Log Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </div>
        </div>
        <div className="flex px-2 items-center justify-evenly">
          <Image width={150} className="rounded-full" height={150} src={session?.user?.image ?? '/blank-profile.png'} alt="Taufik" />
          <div className="bg-white shadow-md p-4 rounded-md flex gap-4 items-center">
            <div>
              <h2>{session?.user?.name}</h2>
              {/* <p>{session?.user?.name?.split(' ')[session?.user?.name?.split(' ').length - 1]}</p> */}
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div onClick={() => setIsActive(!isActive)} className="w-1/2 flex gap-1 flex-col items-center cursor-pointer">
            <span>Posts</span>
            {isActive && <span className="h-[3px] bg-secondary w-full"></span>}
          </div>
          <div onClick={() => setIsActive(!isActive)} className="w-1/2 flex gap-1 flex-col items-center cursor-pointer">
            <span>Comments</span>
            {!isActive && <span className="h-[3px] bg-secondary w-full"></span>}
          </div>
        </div>
      </div>
      <div className={` pt-2 pb-16 gap-2 bg-gray flex flex-col items-center`}>
        {isActive && <PostsList />}
        {!isActive && <CommentsList />}
      </div>
    </>
  );
};

export default Profile;
