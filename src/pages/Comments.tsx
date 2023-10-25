'use client';
import Comment from '@/components/Comment';
import InputComment from '@/components/InputComment';
import Post from '@/components/Post';
import Link from 'next/link';
import React from 'react';

interface IProps {
  postId: string;
}

const Comments = ({ postId }: IProps) => {
  return (
    <>
      <div className="bg-gray container max-w-lg px-4 pb-6 flex items-center flex-col ">
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
            name="Muhammad Taufik"
            description="lorem ipsum dolor sit amet"
            id={99}
            profilePicture="https://source.unsplash.com/random/50x50/?profile"
            imagePost="https://source.unsplash.com/random/350x200/?laptop"
            isBtnComment={false}
            className="w-full"
          />
        </div>
        <div className="flex flex-col w-full gap-2 mt-4 px-4 mb-16">
          <div className="flex justify-start w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" order="left" />
          </div>
          <div className="flex justify-start w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" order="left" />
          </div>

          <div className="flex justify-end w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
          </div>
          <div className="flex justify-end w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
          </div>
          <div className="flex justify-end w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
          </div>
          <div className="flex justify-end w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asa asa asa" />
          </div>
          <div className="flex justify-start w-full">
            <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" order="left" />
          </div>
        </div>
        <InputComment />
      </div>
    </>
  );
};

export default Comments;
