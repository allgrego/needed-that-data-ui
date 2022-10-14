import { FC } from "react";

const Skeleton: FC = () => {
    return (
        <div className="overflow-hidden shadow sm:rounded-lg rounded mx-auto bg-slate-100 pt-6 pb-4 px-4">
            <div role="status" className="max-w-sm animate-pulse">
                <div className="h-4 bg-gray-600 rounded-full  w-48 mb-4"></div>
                <div className="h-3 bg-gray-600 rounded-full max-w-[360px] mb-7"></div>

                <div className="h-2 bg-gray-600 rounded-full mb-4"></div>
                <div className="h-2 bg-gray-600 rounded-full max-w-[330px] mb-4"></div>
                <div className="h-2 bg-gray-600 rounded-full max-w-[300px] mb-4"></div>
                <div className="h-2 bg-gray-600 rounded-full max-w-[300px] mb-4"></div>
                <div className="h-2 bg-gray-600 rounded-full max-w-[360px]"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Skeleton;