import { toCustomString } from "./fDate";

function timeOnlyHour(formated = false, hour) {
  const timeNow = new Date();

  if (hour !== undefined) timeNow.setHours(hour);

  timeNow.setMinutes(0);
  timeNow.setSeconds(0);

  if (formated) return toCustomString(timeNow);

  return timeNow;
}

export function makeDateHourOnlyList() {
  const hoursIndexes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  let dateHoursList = [];

  hoursIndexes.forEach((hour) => {
    dateHoursList.push(timeOnlyHour(true, hour));
  });

  return dateHoursList;
}

export default function currentTimeIndex() {
  const dateHourNow = timeOnlyHour(true);
  let dateHoursList = makeDateHourOnlyList();

  return dateHoursList.findIndex((dateHour) => dateHour === dateHourNow);
}