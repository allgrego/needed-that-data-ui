import { FC } from "react";

import { CinexUserData } from "@/modules/nationalIdentity/types/cinex.types";
import { PersonDataCne } from "@/modules/nationalIdentity/types/cne.types";
import { getAge, parseDateString } from "@/common/utils/time";

type AdditionalPersonData = CinexUserData;

type PersonAdditionalDataResultsProps = {
  userAdditionalData?: AdditionalPersonData;
  cnePersonData?: PersonDataCne;
};

const PersonAdditionalDataResults: FC<PersonAdditionalDataResultsProps> = ({
  userAdditionalData,
  cnePersonData,
}) => {
  // Render nothing if no additional data
  if (!userAdditionalData) return null;

  return (
    <div className="overflow-hidden bg-gray-50 shadow rounded sm:rounded-lg  mx-auto mt-5">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Additional Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {cnePersonData ? (
            <>
              More details about{" "}
              <span className="capitalize italic">
                {cnePersonData.name.toLowerCase()}
              </span>{" "}
              were found.
            </>
          ) : (
            <>However, the following info was found in another source</>
          )}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {/* Person Name - Only to be displayed if there is no data from CNE */}
          {!cnePersonData && (
            <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
                {String(userAdditionalData.fname).toLowerCase()}{" "}
                {String(userAdditionalData.lname).toLowerCase()}
              </dd>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
              {parseDateString(userAdditionalData.dob)}
            </dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Age</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <span className="capitalize">
                {getAge(userAdditionalData.dob)}
              </span>{" "}
              years
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Sex</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 capitalize">
              {userAdditionalData.sex === "F"
                ? "Female"
                : userAdditionalData.sex === "M"
                ? "Male"
                : userAdditionalData.sex}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PersonAdditionalDataResults;
