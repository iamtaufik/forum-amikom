'use client';
import React from 'react';
import Comment from './Comment';

const CommentsList = () => {
  return (
    <>
      <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
      <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
      <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
      <Comment id={1} name="Muhammad Taufik" profilePicture="https://source.unsplash.com/random/50x50/?profile" content="Kerja Bagus asasasasasas" />
    </>
  );
};

export default CommentsList;
