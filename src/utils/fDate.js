export function toCustomString(dateObj) {
  function pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  return dateObj.getFullYear() +
    '-' + pad(dateObj.getMonth() + 1) +
    '-' + pad(dateObj.getDate()) +
    'T' + pad(dateObj.getHours()) +
    ':' + pad(dateObj.getMinutes());
};