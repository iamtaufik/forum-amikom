import Comments from '@/pages/Comments';
import React from 'react';

const Page = ({ params }: { params: { postId: string } }) => {
  return <Comments postId={params.postId} />;
};

export default Page;
