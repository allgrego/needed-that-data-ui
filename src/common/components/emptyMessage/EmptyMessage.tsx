import { FC, ReactNode } from "react";

interface EmptyMessageProps {
  children?: ReactNode;
}

const EmptyMessage: FC<EmptyMessageProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto relative shadow-md rounded-lg opacity-80 w-full h-full">
      <div className="flex items-center justify-center w-full text-sm text-left text-gray-500 bg-slate-200 min-h-[10rem]">
        <div className="text-2xl font-bold">{children}</div>
      </div>
    </div>
  );
};

export default EmptyMessage;
