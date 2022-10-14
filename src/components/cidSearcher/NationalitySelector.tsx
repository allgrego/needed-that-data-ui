import { FC } from "react";
import { nationalityOptions } from "../../utils/cid";
import { NationalitySelectorProps } from "./cidSearcher.types";

const NationalitySelector: FC<NationalitySelectorProps> = ({ nat, showOptions = false, toggleOptions, selectNationality }) => {
    return (
        <div>
            <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button"
                onClick={toggleOptions}
            >
                {nat} <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {/* Options Dropdown */}
            <div id="dropdown" className={`${!showOptions && 'hidden'} absolute onset-0  mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                    {
                        nationalityOptions.map(({code, text}) => (
                            <li key={code}
                                onClick={() => { selectNationality(code); toggleOptions() }}
                            >
                                <span className="block py-2 px-4  hover:bg-gray-600 hover:text-white cursor-pointer">{text} - {code}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default NationalitySelector;