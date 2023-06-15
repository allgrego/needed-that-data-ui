import { FC } from "react";

import { PersonDataCne } from "@/modules/nationalIdentity/types/cne.types";

type CidPersonDataResultsProps = {
  personData: PersonDataCne;
  viewRif?: boolean;
};

const CidPersonDataResults: FC<CidPersonDataResultsProps> = ({
  personData,
  viewRif = true,
}) => {
  return (
    <div className="overflow-hidden bg-gray-50 shadow rounded sm:rounded-lg  mx-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Results</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details according to voter registration.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
              {personData.name.toLowerCase()}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
              {personData.state?.toLowerCase()}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Municipality</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
              {personData.municipality?.toLowerCase()}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Parish</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
              {personData.parish?.toLowerCase()}
            </dd>
          </div>
          {viewRif && (
            <div className="bg-gray-100 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">RIF</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 uppercase">
                {personData.rif}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default CidPersonDataResults;
