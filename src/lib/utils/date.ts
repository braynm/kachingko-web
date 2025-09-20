import { endOfYear, format, parseISO, startOfYear } from "date-fns"


export const ISO8601_FORMAT = 'yyyy-MM-dd'
export function formatDate(date: string | Date, dtFormat: string = "yyyy-MM-dd") {

  if (typeof date === "string") {
    return format(parseISO(date), dtFormat)
  }

  return format(date, dtFormat)
}

/**
 * Gets the year-to-date range (start and end date of the year)
 * @param now - Optional date to get the year range for. Defaults to current date.
 * @returns Object containing the start and end dates of the year
 */
export function getYearToDate(now = new Date()) {
  return {
    startDate: formatDate(startOfYear(now)),
    endDate: formatDate(endOfYear(now))
  };

}
