function getDifferenceInMinutes(diffInMs) {
  return diffInMs / (1000 * 60);
}

const fromMinutesToYears = 365 * 24 * 60;
const fromMinutesToMonths = 30 * 24 * 60;
const fromMinutesToWeeks = 7 * 24 * 60;
const fromMinutesToDays = 24 * 60;
const fromMinutesToHours = 60;

export function getDestance(Date1, Date2) {
  const date1 = new Date(Date1);
  const date2 = new Date(Date2);
  const diffInMs = Math.abs(date2 - date1);

  let minutes = getDifferenceInMinutes(diffInMs);
  const numberOfYears = parseInt(minutes / fromMinutesToYears);
  minutes = minutes - fromMinutesToYears * numberOfYears;
  const numberOfMonths = parseInt(minutes / fromMinutesToMonths);
  minutes = minutes - fromMinutesToMonths * numberOfMonths;
  const numberOfWeeks = parseInt(minutes / fromMinutesToWeeks);
  minutes = minutes - fromMinutesToWeeks * numberOfWeeks;
  const numberOfDays = parseInt(minutes / fromMinutesToDays);
  minutes = minutes - fromMinutesToDays * numberOfDays;
  const numberOfHours = parseInt(minutes / fromMinutesToHours);
  minutes = minutes - fromMinutesToHours * numberOfHours;

  return {
    years: numberOfYears,
    months: numberOfMonths,
    weeks: numberOfWeeks,
    days: numberOfDays,
    hours: numberOfHours,
    minutes: parseInt(minutes),
  };
}

export const createTimeString = (Date1, Date2) => {
  let distanceObject = getDestance(Date1, Date2);
  let keys = Object.keys(distanceObject);
  let timeString = "";
  let first = keys.length;
  for (let i = 0; i < keys.length; i++) {
    if (i - first > 1) break;
    if (distanceObject[keys[i]]) {
      if (first < keys.length) {
        timeString +=
          " & " +
          distanceObject[keys[i]] +
          " " +
          (distanceObject[keys[i]] == 1
            ? keys[i].slice(0, keys[i].length - 1)
            : keys[i]);
      } else {
        timeString +=
          distanceObject[keys[i]] +
          " " +
          (distanceObject[keys[i]] == 1
            ? keys[i].slice(0, keys[i].length - 1)
            : keys[i]);
        first = i;
      }
    }
  }
  return timeString + " Ago";
};
