import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getRoute } from "@/common/utils/routes";
import { debugErrorLog } from "@/common/utils/debug";

import { BankData, BankDataResponse } from "@/modules/banks/types/banks.types";

const SHOW_LESS_SIZE = 8;

const useBanksCodes = () => {
  const banksDataQuery = useQuery<BankData[] | undefined>({
    queryKey: ["banksData"],
    queryFn: async () => {
      try {
        const url = getRoute("service-farmatodo-get-banks-codes");

        const response = await fetch(url);

        if (!response.ok) {
          debugErrorLog("Server error message", await response.text());
          throw new Error("Response no OK");
        }

        const jsonResponse = (await response.json()) as BankDataResponse;

        const banksData = jsonResponse.data;

        return banksData;
      } catch (error) {
        debugErrorLog("Failure in banks data query", error);
        return Promise.reject("Unable to get banks data");
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const [showAll, setShowAll] = useState<boolean>(false);

  function toggleShowAll() {
    setShowAll((curr) => !curr);
  }

  const banksToDisplay: BankData[] = useMemo(() => {
    let banks = banksDataQuery?.data;

    if (!banks) return [];

    if (!showAll) banks = banks.slice(0, SHOW_LESS_SIZE);

    return banks;
  }, [banksDataQuery?.data, showAll]);

  function onBankClick(bankId: string) {
    navigator.clipboard.writeText(bankId);
  }

  return {
    banksDataQuery,
    banksToDisplay,
    showAll,
    toggleShowAll,
    onBankClick,
  };
};

export default useBanksCodes;
