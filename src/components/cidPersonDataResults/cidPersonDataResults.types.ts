import { PersonDataCne } from "../../utils/cne.types";

export interface CidPersonDataResultsProps{
    personData: PersonDataCne
    viewRif?: boolean
}

export interface CidPersonDataErrorProps{
    errorMessage: string
}