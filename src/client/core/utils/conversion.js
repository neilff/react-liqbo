/**
 * Pads numbers with zeros based on what it is provided. This is useful
 * for converting prices or time, ex:
 *
 * leftPad(1, 2) -> 01
 * leftPad(10, 2) -> 10
 * leftPad(100, 2) -> 100
 *
 * @param {integer} number Initial number
 * @param {integer} targetLength Desired minimum length after padding
 * @return {integer} Initial number with padding
 */
export function leftPad(number, targetLength) {
  var output = number + '';

  while (output.length < targetLength) {
    output = '0' + output;
  }

  return output;
}

/**
 * Converts minutes since midnight to 24 hour time. Useful to check
 * if a store is currently open.
 *
 * @param {string} msm Time in minutes since midnight
 * @return {array} Hours and minutes
 */
export function msmTo24time(msm) {
  var hour = Math.floor(parseInt(msm) / 60);
  var mins = Math.floor(parseInt(msm) % 60);

  return [hour, mins];
}

/**
 * Converts minutes since midnight to 12 hour time.
 * Useful for display purposes.
 *
 * @param {string} msm Time in minutes since midnight
 * @return {array} Hours, minutes, and AM or PM
 */
export function msmTo12time(msm) {
  var time = msmTo24time(msm);
  var h24  = time[0];
  var h12  = (0 == h24 ? 12 : (h24 > 12 ? (h24 - 10) - 2 : h24));
  var ampm = (h24 >= 12 ? 'PM' : 'AM');

  return [h12, time[1], ampm];
}

/**
 * Prettifies output from msmTo12time for display purposes. If the time
 * is NaN, then the store is closed, and return null.
 *
 * @param {array} arr Output from msmTo12time
 * @return {string} Time in 'HH:MM AM/PM' format
 */
export function prettify12Hr(arr) {
  return isNaN(arr[0]) || isNaN(arr[1]) ?
    null :
    arr[0] + ':' + leftPad(arr[1], 2) + ' ' + arr[2];
}

export const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];
