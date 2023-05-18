import { MESSAGE_ERRORS, REGEX } from '@constants';

/**
 * @description function check the value is empty or not
 *
 * @param {string | number} value is value of input
 *
 * @returns {boolean}
 */
const isEmpty = (value: string | number): boolean => !value;

/**
 * @description function check the value match with regex or not
 *
 * @param {string} value The value to be checked.
 * @param {RegExp} regex The regular expression to be matched the value.
 *
 * @returns {boolean}
 */
const isMatchRegex = (regex: RegExp, value: string): boolean => regex.test(value);

/**
 * @description function check the number is a positive number or not
 *
 * @param {number} value is value of input
 *
 * @returns {boolean}
 */
const isPositiveNumber = (value: number): boolean => value > 0;

/**
 * @description function validation with data of all input
 *
 * @param {Object} data is data of all input after enter value
 * @param {Array} fieldsNumber enter name of fields which we want to check in number
 *
 * @returns {Object} return object with message error
 */
const validation = <T extends object, X>(data: T, fieldsNumber = ['']): X => {
  let errorsMessage = {};
  for (const [key, value] of Object.entries(data)) {
    // Check which fields want to check as number
    if (fieldsNumber.includes(key)) {
      switch (true) {
        case isEmpty(value):
          errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.EMPTY_FIELD };
          break;
        // case check if the value is not an integer number
        case !isMatchRegex(REGEX.INTEGER_NUMBER, String(value)) && key === 'quantity':
          errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.INTEGER_NUMBER };
          break;
        // case check if the value is not a positive number
        case !isPositiveNumber(value):
          errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.POSITIVE_NUMBER };
          break;
        default:
          errorsMessage = { ...errorsMessage, [key]: '' };
          break;
      }
    } else {
      switch (true) {
        // case check if value is empty
        case isEmpty(value):
          errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.EMPTY_FIELD };
          break;
        // case check if the value has an empty string at the beginning or end
        case isMatchRegex(REGEX.EMPTY_SPACE, value):
          errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.EMPTY_SPACE };
          break;
        default:
          errorsMessage = { ...errorsMessage, [key]: '' };
          break;
      }
    }
  }
  return errorsMessage as X;
};

export { validation, isEmpty, isPositiveNumber, isMatchRegex };
