import { FC } from "react";

type CidPersonDataErrorProps = {
  errorMessage: string;
};

const CidPersonDataError: FC<CidPersonDataErrorProps> = ({
  errorMessage = "there was an error",
}) => {
  return (
    <div className="overflow-hidden bg-slate-100 shadow rounded sm:rounded-lg mx-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-md font-medium leading-6 text-red-400">
          Ups! Something went wrong
        </h3>
        <p className="mt-5 max-w-2xl text-sm   text-gray-700">{errorMessage}</p>
      </div>
    </div>
  );
};

export default CidPersonDataError;
