import { useEffect, useState } from "react";

interface UseNationalitySelectorProps {
  nationality: string;
  setNationality: (nationality: string) => void;
}

const useNationalitySelector = ({
  nationality,
  setNationality,
}: UseNationalitySelectorProps) => {
  const nat = nationality;
  const setNat = setNationality;

  const [showOptions, setShowOptions] = useState<boolean>(false);
  useEffect(() => {
    // Close dropdown every time a nationality is selected
    closeOptions();
  }, [nat]);

  const selectNationality = (nationality: string) => {
    setNat(nationality);
  };

  const openOptions = () => {
    setShowOptions(true);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  const toggleOptions = () => {
    setShowOptions((current) => !current);
  };

  return {
    nat,
    setNat,
    showOptions,
    setShowOptions,
    selectNationality,
    openOptions,
    closeOptions,
    toggleOptions,
  };
};

export default useNationalitySelector;
