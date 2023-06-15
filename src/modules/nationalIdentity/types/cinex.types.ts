export type CinexUserDataBackend = {
  usuarioid: number;
  correoelectronico: string;
  username: string;
  nombre: string;
  apellido: string;
  ci: string;
  fechanacimiento: string;
  sexo: string;
  [rest: string]: any;
};

export type CinexPersonDataApiResponseData = string | CinexUserDataBackend;

export type CinexPersonDataApiResponse = {
  code: number;
  error: boolean;
  result: boolean;
  response: CinexPersonDataApiResponseData;
};

// Internal usage
export type CinexUserData = {
  cinexId?: number;
  email: string;
  username?: string;
  fname: string;
  lname: string;
  cid: string;
  dob: string;
  sex: string;
  [rest: string]: any;
};
