import { NationalityData } from "@/modules/nationalIdentity/types/cid.types";

export enum NationalityCodes {
  VENEZUELAN = "V",
  FOREIGN = "E",
}

export const nationalityOptions: NationalityData[] = [
  {
    code: NationalityCodes.VENEZUELAN,
    text: "Venezuelan",
  },
  {
    code: NationalityCodes.FOREIGN,
    text: "Foreign",
  },
];
