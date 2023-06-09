import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

import BcvRates from "@/modules/exchangeRates/components/bcvRates/BcvRates";
import CidPersonDataError from "@/modules/nationalIdentity/components/cidPersonDataResults/CidPersonDataError";
import CidPersonDataResults from "@/modules/nationalIdentity/components/cidPersonDataResults/CidPersonDataResults";
import CidSearcher from "@/modules/nationalIdentity/components/cidSearcher/CidSearcher";
import MonitorDolarRates from "@/modules/exchangeRates/components/monitorDolarRates/MonitorDolarRates";
import Skeleton from "@/common/components/skeleton/Skeleton";
import WelcomeBanner from "@/common/components/welcomeBanner/WelcomeBanner";
import MainLayout from "@/common/layouts/MainLayout";
import { fetchRatesInVes } from "@/modules/exchangeRates/utils/bcv";
import { fetchRatesHistoryInVes } from "@/modules/exchangeRates/utils/monitor-dolar";
import MonitorDolarLineChart from "@/modules/exchangeRates/components/monitorDolarLineChart/MonitorDolarLineChart";
import useCidSearcher from "@/modules/nationalIdentity/hooks/useCidSearcher";

import { MonitorHistoryRatesData } from "@/modules/exchangeRates/types/monitor-dolar.types";
import { BcvRatesInfo } from "@/modules/exchangeRates/types/bcv.types";

const Home: NextPage = () => {
  /**
   * CID Searcher Related
   */
  const {
    nationality,
    setNationality,
    number,
    setNumber,
    onChangeNumber,
    onSubmit,
    isLoading,
    isError,
    error,
    personData,
  } = useCidSearcher();
  const err = error as any;
  const errorMessage = err?.message || undefined;

  /**
   * BCV Rates Related
   */
  const bcvQuery = useQuery(["bcvRates"], fetchRatesInVes, {
    initialData: undefined,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // update after 5 minute
  });
  const bcvRatesData: BcvRatesInfo | undefined = bcvQuery.data;

  /**
   * Monitor Rates Related
   */
  const monitorDolarQuery = useQuery({
    queryKey: ["monitorDolarHistoryRates"],
    queryFn: async () => {
      try {
        return await fetchRatesHistoryInVes();
      } catch (error) {
        console.debug("Error in Monitor Dolar query: ", error);
        return Promise.reject("Monitor Dolar service unavailable!");
      }
    },
    initialData: undefined,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // update after 5 minutes
  });
  const monitorDolarHistoryRates: MonitorHistoryRatesData | undefined =
    monitorDolarQuery.data;

  return (
    <>
      <MainLayout>
        <div className="pt-10 lg:pt-10 px-4 lg:px-40 pb-20 ">
          {/* Welcome Banner */}
          <WelcomeBanner />
          {/* Container */}
          <div className="">
            <div className="flex flex-row flex-wrap items-start">
              {/* Column 1 */}
              <div className="w-full lg:w-1/2 space-y-6 pr-0 lg:pr-5">
                {/* BCV Rates */}
                <div className="bg-gradient-to-bl  from-slate-300 to-blue-300 rounded p-4 md:mt-0 sm:p-6 shadow-lg lg:mb-0">
                  <div className="h-fit">
                    <div className="mb-6 px-3">
                      <h1 className="font-bold text-3xl text-slate-800">
                        BCV Bolivares Rates
                      </h1>
                      <div className="font-light mt-3 text-sm">
                        Current Bolivares (VES) official rates in main
                        currencies{" "}
                      </div>
                    </div>
                    <div>
                      <BcvRates
                        ratesData={bcvRatesData}
                        isError={bcvQuery.isError}
                        isFetched={bcvQuery.isFetched}
                        isFetching={bcvQuery.isFetching}
                        isLoading={bcvQuery.isLoading}
                        dataUpdatedAt={bcvQuery.dataUpdatedAt}
                      />
                    </div>
                    <div className="text-center text-xs text-gray-600 mt-5 scale-100 opacity-60">
                      Source:{" "}
                      <a
                        className="font-bold text-indigo-600"
                        href="https://www.bcv.org.ve/"
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        Central Bank of Venezuela (
                        <span className="italic">{'"BCV"'}</span>)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Monitor Rates */}
                <div className="w-full bg-gradient-to-l h-fit from-slate-300 to-blue-300 rounded p-4 mt-7 md:mt-0 sm:p-6 shadow-lg mb-12 lg:mb-0">
                  <div>
                    <div className="mb-6 px-3">
                      <h1 className="font-bold text-3xl text-slate-800">
                        Monitor Dolar Rate
                      </h1>
                      <div className="font-light mt-3 text-sm">
                        Current Bolivares (VES) parallel rate{" "}
                      </div>
                    </div>
                    <div>
                      <MonitorDolarRates
                        ratesHistoryData={monitorDolarHistoryRates}
                        isError={monitorDolarQuery.isError}
                        isFetched={monitorDolarQuery.isFetched}
                        isFetching={monitorDolarQuery.isFetching}
                        isLoading={monitorDolarQuery.isLoading}
                        dataUpdatedAt={monitorDolarQuery.dataUpdatedAt}
                      />
                    </div>

                    <div className="flex items-center justify-center mt-8 mb-6 min-h-[20rem]">
                      <MonitorDolarLineChart dataQuery={monitorDolarQuery} />
                    </div>

                    <div className="text-center text-xs text-gray-700 mt-5 scale-100 opacity-60">
                      Source:{" "}
                      <a
                        className="font-bold text-indigo-600"
                        href="https://monitordolarvzla.com/category/promedio-del-dolar/"
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        Monitor Dolar Venezuela Website
                      </a>
                    </div>

                    <div className="text-center text-xs scale-90 font-medium text-gray-700/60 mt-2">
                      Rates obtained from the website may vary compared to the
                      instagram account
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="w-full mt-6 lg:w-1/2 lg:mt-0 ">
                {/* Venezuelan ID searcher */}
                <div className="bg-gradient-to-br from-indigo-300 to-sky-200 rounded p-4 sm:p-6 shadow-lg h-fit ">
                  <div className="mb-10">
                    <div className="mb-6 px-3">
                      <h1 className="font-bold text-3xl text-slate-800">
                        Venezuelan ID searcher
                      </h1>
                      <div className="font-light mt-3 text-sm">
                        Search someone{"'"}s personal data such as full name,
                        state, municipality, parish and RIF according to their
                        venezuelan ID.{" "}
                      </div>
                    </div>
                    {/* Searcher */}
                    <CidSearcher
                      nationality={nationality}
                      setNationality={setNationality}
                      number={number}
                      setNumber={setNumber}
                      onChangeNumber={onChangeNumber}
                      onSubmit={onSubmit}
                      isLoading={isLoading}
                    />

                    {/* Data */}
                    {isLoading ? (
                      <div className="mt-5 pl-4">
                        <Skeleton />
                      </div>
                    ) : (
                      <div className="mt-5 pl-4">
                        {/* Error Message */}
                        {isError && (
                          <CidPersonDataError errorMessage={errorMessage} />
                        )}

                        {/* Data displaying */}
                        {personData && (
                          <CidPersonDataResults personData={personData} />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-center text-xs text-gray-600 mt-5 scale-100 opacity-60">
                    Source:{" "}
                    <a
                      className="font-bold text-indigo-600"
                      href="http://www.cne.gob.ve/"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      Venezuelan National Electoral Council (
                      <span className="italic">{'"CNE"'}</span>)
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Container */}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
