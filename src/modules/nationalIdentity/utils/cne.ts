import { getRoute } from "@/common/utils/routes";
import { PersonDataCne } from "@/modules/nationalIdentity/types/cne.types";

export const fetchPersonData = async (
  nationality: string,
  number: string
): Promise<PersonDataCne | null> => {
  try {
    if (!nationality) throw new Error("A valid nationality is required");

    if (!number) throw new Error("A valid ID number is required");

    const url = `${getRoute(
      "api-national-identity-cne-get-person-data"
    )}?nat=${nationality}&num=${number}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.status === 404) {
      throw new Error(`No data has been found for ID ${nationality}-${number}`);
    }

    if (response.status === 400) {
      throw new Error("Invalid information has been provided");
    }

    if (!response.ok) {
      throw new Error("There was an error fetching data");
    }

    const personData: PersonDataCne | undefined = await response.json();

    if (!personData) {
      throw new Error("There was an error. No data was found");
    }

    return personData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
