import { MESSAGE_ERRORS, REGEX } from '@constants';

/**
 * @description function check the value is empty or not
 *
 * @param {string} value is value of input
 *
 * @returns {boolean}
 */
export const isEmpty = (value: string): boolean => !value;

/**
 * @description function check the value match with regex or not
 *
 * @param {string} value The value to be checked.
 * @param {RegExp} regex The regular expression to be matched the value.
 *
 * @returns {boolean}
 */
export const isMatchRegex = (regex: RegExp, value: string): boolean => regex.test(value);

/**
 * @description Validates a given value against specific rules.
 *
 * @param {string} value - The value to be validated.
 * @param {boolean} isLength to check if the validation check length or not
 *
 * @returns {string[]} errors - An array of error messages.
 */
export const validation = (value: string, isLength: boolean = false): string[] => {
  const errors: string[] = [];

  // Check if the value is empty
  if (isEmpty(value)) {
    errors.push(MESSAGE_ERRORS.REQUIRED);
  } else {
    // Check if the value length is less than 3
    if (value.length < 3 && isLength) {
      errors.push(MESSAGE_ERRORS.MIN_LENGTH);
    }

    // Check if the value contains only alphabetic characters
    if (!isMatchRegex(REGEX.ALPHABETS, value)) {
      errors.push(MESSAGE_ERRORS.ALPHABETS);
    }
  }

  return errors;
};
