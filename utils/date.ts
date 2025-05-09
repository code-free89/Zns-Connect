import moment from "moment";

export const getDates = function (timestamp: string | undefined) {
  if (!timestamp) timestamp = new Date().toString();
  const tempDate = new Date(timestamp);

  const momentOfTimestamp = moment(tempDate);
  return {
    yearFull: momentOfTimestamp.format("YYYY"),
    yearShort: momentOfTimestamp.format("YY"),
    quarter: momentOfTimestamp.format("Q"),
    monthFull: momentOfTimestamp.format("MM"),
    monthShort: momentOfTimestamp.format("M"),
    monthFullname: momentOfTimestamp.format("MMMM"),
    monthShortname: momentOfTimestamp.format("MMM"),
    dayFull: momentOfTimestamp.format("DD"),
    dayShort: momentOfTimestamp.format("D"),
    dateNormal: momentOfTimestamp.format("MMMM D, YYYY"),
    dateShortname: momentOfTimestamp.format("DD MMMM YYYY"),
    dateLong: momentOfTimestamp.format("MMM Do YYYY"),
    timeShort: momentOfTimestamp.format("HH:mm"),
    dateFull: momentOfTimestamp.format("DD MMMM YYYY HH:mm"),
    monthYear: momentOfTimestamp.format("MMMM, YYYY"),
    isValid: true,
  };
};
