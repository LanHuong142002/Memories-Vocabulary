import { MESSAGE_ERRORS, REGEX } from '@constants';

/**
 * @description function check empty or not
 *
 * @param {string} value of input
 *
 * @returns {string} a message error or empty string
 */
const checkEmpty = (value: string): string => {
  console.log(value);

  switch (true) {
    // case empty
    case !value.trim():
      return MESSAGE_ERRORS.EMPTY_FIELD;
    default:
      return '';
  }
};

/**
 * @description function check value is number or not
 *
 * @param {String} value of input
 *
 * @returns {string} a message error or empty string
 */
const checkNumber = (key: string, value: string): string => {
  switch (true) {
    // case empty
    case !value.trim():
      return MESSAGE_ERRORS.EMPTY_FIELD;
    // case if value is not positive number
    case Number(value) < 0:
      return MESSAGE_ERRORS.POSITIVE_NUMBER;
    case !REGEX.DECIMAL_NUMBER.test(value) && key === 'quantity':
      return MESSAGE_ERRORS.INTEGER_NUMBER;
    default:
      return '';
  }
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
      errorsMessage = { ...errorsMessage, [key]: checkNumber(key, String(value)) };
    }
    // Check value is empty or not
    else {
      errorsMessage = { ...errorsMessage, [key]: checkEmpty(value) };
    }
  }

  return errorsMessage as X;
};

export { validation, checkEmpty, checkNumber };
