export interface CidSearcherProps {
    nationality: string
    setNationality: (newNationality: string) => void
    number?: string
    setNumber?: any 
    personData?: any
}

export interface NationalitySelectorProps {
    nat: string
    showOptions?: boolean,
    toggleOptions: () => void
    selectNationality: (nationality: string) => void
}

export interface UseNationalitySelectorProps {
    nationality: string
    setNationality: (nationality: string) => void
}