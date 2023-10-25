import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface IProps {
  id: number;
  name: string;
  profilePicture: string;
  imagePost?: string;
  description: string;
  isBtnComment?: boolean;
  className?: string;
}

const Post = ({ id, name, profilePicture, imagePost, description, className, isBtnComment = true }: IProps) => {
  return (
    <div className={`flex flex-col gap-y-4 bg-white p-4 rounded-lg shadow-md ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image className="rounded-full " width={50} height={50} src={profilePicture} alt={name} />
          <h2 className="text-dark text-sm font-semibold">{name}</h2>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      </div>
      {imagePost && (
        <div className="">
          <Image width={350} height={200} className="w-full rounded-2xl " src={imagePost} alt={description} />
        </div>
      )}
      <div>
        <p>{description}</p>
      </div>
      {isBtnComment && (
        <div className="flex justify-end">
          <Link href={`/post/${id}/comments`}>
            <span className="text-primary font-semibold flex items-center">
              Lihat Komentar{' '}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Post;
