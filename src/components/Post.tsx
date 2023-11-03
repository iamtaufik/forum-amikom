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
        <div className="relative flex flex-col justify-end items-end">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </div>
          {/* <div className="absolute w-max top-4 ">
            <div className="flex items-center gap-2 shadow-md px-4 py-2 rounded-md">
              <p className="text-sm">Hapus Postingan</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div> */}
        </div>
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
