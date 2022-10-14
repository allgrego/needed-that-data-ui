import { FC } from "react";
import { CidSearcherProps } from "./cidSearcher.types";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import NationalitySelector from "./NationalitySelector";
import useNationalitySelector from "./useNationalitySelector";

const CidSearcher: FC<any> = (props) => {
    const { nationality, setNationality, number, setNumber, onChangeNumber, onSubmit, personData, isLoading } = props
    const { nat, showOptions, toggleOptions, selectNationality } = useNationalitySelector({ nationality, setNationality })

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
                <div className="flex max-w-md mx-auto">
                    <NationalitySelector
                        nat={nat}
                        selectNationality={selectNationality}
                        showOptions={showOptions}
                        toggleOptions={toggleOptions}
                    />

                    <div className="relative w-full">
                        <input type="search" id="cid-search" 
                            className={`block p-2.5 w-full z-20 text-sm text-gray-900 ${isLoading?'bg-slate-200':'bg-slate-100'} rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 `}
                            placeholder='Venezuelan ID number in format "12345678"'
                            value={number}
                            onChange={onChangeNumber}
                            disabled={isLoading}
                        />

                        <button type="button" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-indigo-700 rounded-r-lg border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            onClick={onSubmit}
                        >
                            {
                                isLoading ? (
                                    <div>...</div>
                                ) : (
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                )
                            }

                            {/* <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> */}
                            <span className="sr-only">Buscar</span>
                        </button>
                    </div>
                </div>
            </form>

        </>
    );
}

export default CidSearcher;