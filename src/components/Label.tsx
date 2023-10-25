import React from 'react';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Label = ({ text, className, onClick }: Props) => {
  return (
    <div onClick={onClick} className={`cursor-pointer shadow-md w-max py-2 px-4 rounded-full ${className}`}>
      {text}
    </div>
  );
};

export default Label;
