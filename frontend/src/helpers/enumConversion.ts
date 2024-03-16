import { Status } from '../enums/candidateStatus';

export const convertStatusStringToEnum = (statusString: string): Status => {
  return Status[statusString as keyof typeof Status];
};

export const convertStatusEnumToString = (status: Status): string => {
  return status.toString();
};
