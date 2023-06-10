export type BankData = {
  id: string;
  name: string;
};

export type BankDataResponse = {
  code: string;
  message: string;
  data: BankData[];
};
