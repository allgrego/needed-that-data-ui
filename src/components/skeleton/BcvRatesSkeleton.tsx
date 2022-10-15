import { FC } from "react";

const BcvRatesSkeleton: FC = () => {
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg opacity-80">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700  bg-indigo-500">
                    <tr>
                        <th scope="col" className="py-3 px-6" colSpan={2}>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-2 bg-gray-600 rounded-full max-w-[360px] my-2"></div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ['usd', 'eur'].map((code) => (
                            <tr key={code} className="bg-slate-200 border-b">
                                <td scope="row" className="py-4 px-4">
                                    <div role="status" className="max-w-sm animate-pulse">
                                        <div className="h-2 bg-gray-600 rounded-full max-w-[390px] my-2.5"></div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default BcvRatesSkeleton;