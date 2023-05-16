import { MESSAGE_ERRORS, REGEX } from '@constants';

/**
 * @description function check the value is empty or not
 *
 * @param {string} value is value of input
 *
 * @returns {boolean}
 */
const isEmpty = (value: string) => {
  if (!String(value).trim()) {
    return false;
  }

  return true;
};

/**
 * @description This function checks whether a given value matches a given regular expression or not.
 *
 * @param {string} value The value to be checked.
 * @param {RegExp} regex The regular expression to be matched against the value.
 *
 * @returns {boolean}
 */
const isRegex = (regex: RegExp, value: string) => {
  if (regex.test(String(value))) {
    return false;
  }

  return true;
};

/**
 * @description function check the number is a positive number or note
 *
 * @param {string} value is value of input
 *
 * @returns {boolean}
 */
const isPositiveNumber = (value: number) => {
  if (Number(value) < 0) {
    return false;
  }

  return true;
};

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
      if (!isEmpty(value)) {
        errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.EMPTY_FIELD };
      } else if (isRegex(REGEX.DECIMAL_NUMBER, value) && key === 'quantity') {
        errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.INTEGER_NUMBER };
      } else if (!isPositiveNumber(value)) {
        errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.POSITIVE_NUMBER };
      } else {
        errorsMessage = { ...errorsMessage, [key]: '' };
      }
    }
    // Check value is empty or not
    else {
      if (!isEmpty(value)) {
        errorsMessage = { ...errorsMessage, [key]: MESSAGE_ERRORS.EMPTY_FIELD };
      } else {
        errorsMessage = { ...errorsMessage, [key]: '' };
      }
    }
  }

  return errorsMessage as X;
};

export { validation, isEmpty, isPositiveNumber, isRegex };
