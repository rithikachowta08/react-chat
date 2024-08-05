import { format } from "date-fns";

export const getDateFromUnixTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return format(date, "dd/MM/yyyy");
};

export const getTimeFromUnixTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return format(date, "hh:mm a");
};
