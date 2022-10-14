import { useQuery } from '@tanstack/react-query'
import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import BcvRates from '../components/bcvRates/BcvRates'
import CidPersonDataError from '../components/cidPersonDataResults/CidPersonDataError'
import CidPersonDataResults from '../components/cidPersonDataResults/CidPersonDataResults'
import CidSearcher from '../components/cidSearcher/CidSearcher'
import useCidSearcher from '../components/cidSearcher/useCidSearcher'
import Skeleton from '../components/skeleton/Skeleton'
import WelcomeBanner from '../components/welcomeBanner/WelcomeBanner'
import MainLayout from '../layouts/mainLayout/MainLayout'
import { fetchRatesInVes } from '../utils/bcv'
import { BcvRatesInfo } from '../utils/bcv.types'


const Home: NextPage = () => {
  /**
   * CID Searcher Related
   */
  const { nationality, setNationality, number, setNumber, onChangeNumber, onSubmit, isLoading, isError, error, personData } = useCidSearcher()
  const err = error as any
  const errorMessage = err?.message || undefined
  /**
   * BCV Rates Related
   */
  const query = useQuery(['bcvRates'], fetchRatesInVes, { initialData: undefined })
  const bcvRatesData: BcvRatesInfo | undefined = query.data


  return (
    <>
      <MainLayout>
        <div className='pt-10 md:pt-10 px-4 md:px-40 pb-20'>
          {/* Welcome Banner */}
          <WelcomeBanner />
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>

            {/* BCV Rates */}
            <div className='bg-gradient-to-bl h-fit from-slate-300 to-blue-300 rounded p-4 mt-7 md:mt-0 sm:p-6 shadow-lg'>
              <div>
                <div className='mb-10 px-3'>
                  <h1 className='font-bold text-3xl text-slate-800'>BCV Rates</h1>
                </div>
                <div>
                  <BcvRates
                    ratesData={bcvRatesData}
                  />
                </div>
                <div className='text-center text-xs text-gray-600 mt-5 scale-75'>Data obtained from <a className='font-bold text-indigo-600' href='https://www.bcv.org.ve/' target={'_blank'} rel="noreferrer">Central Bank of Venezuela (<span className='italic'>{'"BCV"'}</span>)</a></div>
              </div>
            </div>

            {/* Venezuelan ID searcher */}
            <div className='bg-gradient-to-br from-indigo-300 to-sky-200 rounded p-4 sm:p-6 shadow-lg h-fit'>
              <div>
                <div className='mb-6 px-3'>
                  <h1 className='font-bold text-3xl text-slate-800'>Venezuelan ID searcher</h1>
                  <div className='font-light mt-3 text-sm'>Search someone{'\''}s personal data such as full name, state, municipality, parish and RIF according to their venezuelan ID. </div>
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
                {
                  isLoading ? (
                    <div className="mt-5 pl-4">
                      <Skeleton />
                    </div>

                  )
                    :
                    (
                      <div className="mt-5 pl-4">
                        {/* Error Message */}
                        {isError && (
                          <CidPersonDataError errorMessage={errorMessage} />
                        )}

                        {/* Data displaying */}
                        {
                          !!personData && (
                            <CidPersonDataResults
                              personData={personData}
                            />
                          )
                        }

                      </div>
                    )
                }
              </div>
              <div className='text-center text-xs text-gray-400 mt-5 scale-75'>Data obtained from <a className='font-bold text-indigo-400' href='http://www.cne.gob.ve/' target={'_blank'} rel="noreferrer">Venezuelan National Electoral Council (<span className='italic'>{'"CNE"'}</span>)</a></div>
            </div>

          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Home


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}