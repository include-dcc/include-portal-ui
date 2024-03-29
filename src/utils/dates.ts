const LEAP_YEARS = 365.2425;

export const readableDistanceByDays = (distanceInDays: number | string) => ({
  years: Math.floor(Number(distanceInDays) / LEAP_YEARS),
  days: Math.floor(Number(distanceInDays) % LEAP_YEARS),
});

export const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();
