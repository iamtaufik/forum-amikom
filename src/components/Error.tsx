import React from 'react';
interface IProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const Error = ({ title, description, action }: IProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-primary font-semibold">{title}</span>
      <span className="text-slate-400">{description}</span>
      {action}
    </div>
  );
};

export default Error;
