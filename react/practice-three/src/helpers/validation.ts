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
 * @description function validate number filed
 *
 * @param {string} key is the name of field need to validate
 * @param {string} value is the value of field need to validate
 *
 * @returns {string} return message error or empty string
 */
const validateNumberField = (value: number, key?: string) => {
  switch (true) {
    case isEmpty(value):
      return MESSAGE_ERRORS.EMPTY_FIELD;
    // case check if the value is not an integer number
    case !isMatchRegex(REGEX.INTEGER_NUMBER, String(value)) && key === 'quantity':
      return MESSAGE_ERRORS.INTEGER_NUMBER;
    // case check if the value is not a positive number
    case !isPositiveNumber(value):
      return MESSAGE_ERRORS.POSITIVE_NUMBER;
    default:
      return '';
  }
};

/**
 * @description function validate string field
 *
 * @param {string} value is the value of field need to validate
 *
 * @returns {string} return message error or empty string
 */
const validateStringField = (value: string) => {
  switch (true) {
    case isEmpty(value):
      return MESSAGE_ERRORS.EMPTY_FIELD;
    case isMatchRegex(REGEX.EMPTY_SPACE, value):
      return MESSAGE_ERRORS.EMPTY_SPACE;
    default:
      return '';
  }
};

export { isEmpty, isPositiveNumber, isMatchRegex, validateStringField, validateNumberField };
