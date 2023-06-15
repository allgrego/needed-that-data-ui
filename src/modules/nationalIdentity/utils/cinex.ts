import { debugErrorLog, debugLog } from "@/common/utils/debug";
import {
  CinexPersonDataApiResponseData,
  CinexUserData,
} from "@/modules/nationalIdentity/types/cinex.types";
import { NationalityCodes } from "@/modules/nationalIdentity/utils/cid";
import { getRoute } from "@/common/utils/routes";

/**
 * Transform cinex user data obtained from Cinex API into an internal schema
 *
 * @param {CinexPersonDataApiResponseData} cinexUser
 * @return {CinexUserData}
 */
export function parseCinexUserData(
  cinexUser: CinexPersonDataApiResponseData
): CinexUserData {
  try {
    if (!cinexUser || typeof cinexUser === "string") {
      throw new Error("Invalid cinex user data");
    }

    let cid = cinexUser.ci;

    if (
      !(
        cid.startsWith(NationalityCodes.VENEZUELAN) ||
        cid.startsWith(NationalityCodes.FOREIGN)
      )
    ) {
      cid = NationalityCodes.VENEZUELAN + cid;
    }

    const user: CinexUserData = {
      cinexId: cinexUser.usuarioid,
      cid: cid,
      email: String(cinexUser.correoelectronico).toLowerCase(),
      dob: String(cinexUser.fechanacimiento).substring(0, 10),
      fname: cinexUser.nombre,
      lname: cinexUser.apellido,
      sex: String(cinexUser.sexo).toUpperCase(),
      username: cinexUser.username,
    };
    return user;
  } catch (error) {
    debugErrorLog("Error parsing cinex user data");
    throw error;
  }
}

/**
 * Get cinex user data info by CID
 *
 * @param {string} cid Venezuelan ID of person to search
 *
 * @return {Promise<CinexUserData|undefined>} cinex user data if found, otherwise undefined
 */
export async function getCinexUserDataByCID(
  cid: string
): Promise<CinexUserData | undefined> {
  try {
    const url = getRoute("api-national-identity-cinex-get-person-data-by-cid", [
      cid,
    ]);

    const response = await fetch(url);

    if (response.status === 404) {
      debugLog("No person data found");
      return undefined;
    }
    // If any other error
    if (!response.ok) {
      throw new Error(
        `Response not ok (${response.status}|${response.statusText})`
      );
    }

    const userData: CinexUserData = await response.json();

    return userData;
  } catch (error) {
    debugErrorLog("Failure getting cinex user data", error);
    throw error;
  }
}
