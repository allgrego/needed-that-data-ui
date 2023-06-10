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
import useBanksCodes from "@/modules/banks/hooks/useBanksCodes";
import Spinner from "@/common/components/spinner/Spinner";
import EmptyMessage from "@/common/components/emptyMessage/EmptyMessage";

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

  /**
   * Banks codes Related
   */
  const {
    banksDataQuery,
    banksToDisplay,
    toggleShowAll,
    showAll,
    onBankClick,
  } = useBanksCodes();

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
              <div className="w-full mt-6 lg:w-1/2 lg:mt-0 space-y-7 ">
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

                {/* Banks Codes */}
                <div className="bg-gradient-to-br from-indigo-300 to-sky-200 rounded p-4 sm:p-6 shadow-lg h-fit ">
                  <div className="mb-10">
                    <div className="mb-4 px-3">
                      <h1 className="font-bold text-3xl text-slate-700">
                        Venezuelan Banks
                      </h1>
                      <div className="font-light mt-3 text-sm">
                        List of Venezuelan banks with their respective codes.
                        You can select any of them to copy their codes
                      </div>
                      <div
                        className={`text-slate-500 text-sm w-full text-right mt-2 font-medium ${
                          banksDataQuery.isLoading ? "invisible" : ""
                        }`}
                      >
                        Total banks:{" "}
                        {banksDataQuery.isSuccess && banksDataQuery?.data
                          ? banksDataQuery?.data?.length
                          : "Unavailable"}
                      </div>
                    </div>
                    <div>
                      <div className="my-4 flex flex-row justify-center ">
                        {showAll && (
                          <div
                            className="w-fit shadow bg-indigo-400/50 px-4 text-white p-1 rounded-full flex flex-row justify-center items-center content-center text-sm font-normal hover:shadow-sm transition duration-500 hover:bg-indigo-400 hover:text-white cursor-pointer active:shadow-none active:bg-indigo-500 active:border-indigo-500"
                            onClick={toggleShowAll}
                          >
                            Show less
                          </div>
                        )}
                      </div>

                      {banksDataQuery.isLoading ? (
                        <div className="text-xs text-center font-medium bg-slate-200/80 p-8 rounded-md">
                          <Spinner />
                        </div>
                      ) : banksDataQuery.isSuccess && banksToDisplay?.length ? (
                        <>
                          <div className="grid grid-cols-2 gap-4 w-full text-slate-500">
                            {banksToDisplay.map((bank, index) => (
                              <div
                                key={index}
                                className="w-full bg-gray-200 px-3 py-1 rounded-md flex flex-col justify-between shadow hover:bg-gradient-to-tl hover:from-indigo-200 hover:to-amber-300/50 hover:via-indigo-100 group duration-500 cursor-pointer active:shadow-none active:bg-gradient-to-bl active:from-indigo-300 active:to-amber-300/70 active:via-indigo-200"
                                onClick={() => {
                                  onBankClick(bank.id);
                                }}
                              >
                                <div className="text-sm font-light text-slate-500  group-hover:text-indigo-400/90 transition group-active:text-indigo-500">
                                  {bank.name}
                                </div>
                                <div className=" text-md font-medium text-indigo-400 transition group-active:text-indigo-800/70">
                                  {bank.id}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="w-full flex justify-center mt-4">
                            <div
                              className="w-fit shadow bg-indigo-400/70 px-4 text-white p-1 rounded-full flex flex-row justify-center items-center content-center text-sm font-normal hover:shadow-sm transition duration-500 hover:bg-indigo-400 hover:text-white cursor-pointer active:shadow-none active:bg-indigo-500 active:border-indigo-500"
                              onClick={toggleShowAll}
                            >
                              Show {showAll ? "less" : "all"}
                            </div>
                          </div>
                        </>
                      ) : (
                        <EmptyMessage>Service unavailable😢</EmptyMessage>
                      )}
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-600 mt-5 scale-100 opacity-60">
                    Source:{" "}
                    <a
                      className="font-bold text-indigo-600"
                      href="https://www.farmatodo.com.ve/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Farmatodo APIs data
                    </a>
                  </div>
                </div>
              </div>
              {/* End Column2 */}
            </div>
            {/* End Columns Containers */}
          </div>
          {/* End Container */}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
