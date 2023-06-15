import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  NationalityCodes,
  nationalityOptions,
} from "@/modules/nationalIdentity/utils/cid";
import { fetchPersonData } from "@/modules/nationalIdentity/utils/cne";
import { PersonDataCne } from "@/modules/nationalIdentity/types/cne.types";
import { debugErrorLog, debugLog } from "@/common/utils/debug";
import { CinexUserData } from "@/modules/nationalIdentity/types/cinex.types";
import { getCinexUserDataByCID } from "@/modules/nationalIdentity/utils/cinex";

const useCidSearcher = () => {
  const defaultNationality =
    nationalityOptions[0]?.code || NationalityCodes.VENEZUELAN;

  const [nationality, setNationality] = useState<string>(defaultNationality);
  const [number, setNumber] = useState<string>("");

  const cnePersonDataMutation = useMutation<PersonDataCne>({
    mutationKey: ["cnePersonData"],
    mutationFn: async () => {
      try {
        const personData = await fetchPersonData(nationality, number);

        if (!personData) {
          return Promise.reject(
            "No data found in CNE records for provided info"
          );
        }

        return personData;
      } catch (error) {
        debugErrorLog("Error in CNE Person Data mutation", error);
        return Promise.reject(
          "Unable to retrieve person data. " + String(error)
        );
      }
    },
    retry: 1,
    retryDelay: 500,
  });

  const personCneData: PersonDataCne | undefined = cnePersonDataMutation.data;

  const cinexDataMutation = useMutation<CinexUserData | undefined>({
    mutationKey: ["cinexPersonData"],
    mutationFn: async () => {
      try {
        const cinexUserData = await getCinexUserDataByCID(
          `${nationality}${number}`
        );

        if (!cinexUserData) {
          debugLog("No additional data found for this person");
        }

        return cinexUserData;
      } catch (error) {
        debugErrorLog("Error in CINEX User Data mutation", error);
        return Promise.reject("Unable to retrieve person additional data");
      }
    },
    retry: 1,
    retryDelay: 500,
  });

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNumber(newValue);
  };

  const onSubmit = () => {
    cnePersonDataMutation.mutate();
    cinexDataMutation.mutate();
  };

  return {
    nationality,
    setNationality,
    number,
    setNumber,
    onChangeNumber,
    onSubmit,
    personCneData,
    cnePersonDataMutation,
    cinexDataMutation,
  };
};

export default useCidSearcher;
