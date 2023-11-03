import NavbarBtm from '@/components/NavbarBtm';
import Profile from '@/pages/Profile';
import React from 'react';

const Page = () => {
  return (
    <div className="container h-screen max-w-lg pb-6 bg-gray">
      <Profile />
      <NavbarBtm />
    </div>
  );
};

export default Page;
