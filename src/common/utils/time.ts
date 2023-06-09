export const getSecondsDiff = (startDate: Date, endDate: Date) => {
  const msInSecond = 1000;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInSecond
  );
};

export const getParsedTimeDiff = (startDate: Date, endDate: Date) => {
  const secondsDiff = getSecondsDiff(startDate, endDate);

  let unit = "seconds";
  let timeDiff = secondsDiff;

  if (timeDiff < 60)
    return {
      unit,
      timeDiff,
    };
  // Difference in minutes
  timeDiff = Math.floor(secondsDiff / 60);
  unit = "minute";

  if (timeDiff > 1) unit = unit + "s";
  return {
    unit,
    timeDiff,
  };
};

/**
 * Get current UTC time in fixed format "YYYY-MM-DD hh:mm:ss.msss UTC"
 *
 * @author Gregorio Alvarez <allgrego14@gmail.com>
 *
 * @return {string} current UTC time in fixed format "YYYY-MM-DD hh:mm:ss.msss UTC"
 */
export function getCurrentUTCTime(): string {
  const now = new Date();

  const year = String(now.getUTCFullYear()).padStart(4, "0");
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  const nowTimestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}.${milliseconds} UTC`;
  return nowTimestamp;
}
