'use client';
import React, { useState } from 'react';
import Comment from './Comment';
import axios from 'axios';

interface Comment {
  id: number;
  body: string;
  student: {
    name: string;
    email: string;
    profile: {
      imageProfile?: string;
    };
  };
}

const CommentsList = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const getMyComments = async () => {
    try {
      const { data } = await axios.get(`/api/profile/comments`);
      setComments(data.data.comments);
    } catch (error: any) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getMyComments();
  }, []);
  return (
    <>
      {comments.length === 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary font-semibold">Belum ada komentar</span>
          <span className="text-slate-400">Buat komentar pertama anda</span>
        </div>
      )}
      {comments.map((comment, index) => (
        <Comment
          key={index}
          name={comment.student.name
            .split(' ')
            .filter((w) => w !== comment.student.name.split(' ')[comment.student.name.split(' ').length - 1])
            .join(' ')}
          id={comment.id}
          profilePicture={comment.student.profile?.imageProfile ?? ''}
          content={comment.body}
        />
      ))}
    </>
  );
};

export default CommentsList;
