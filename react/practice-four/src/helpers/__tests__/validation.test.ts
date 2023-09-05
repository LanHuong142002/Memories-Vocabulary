// Constants
import { MESSAGE_ERRORS, REGEX } from '@constants';

// Helpers
import { isEmpty, isMatchRegex, validation } from '@helpers';

describe('Test isEmpty', () => {
  it('Should return true with empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('Should return false string with value characters', () => {
    expect(isEmpty('hello')).toBe(false);
  });

  it('Should return false string with value characters and empty string', () => {
    expect(isEmpty('hello   ')).toBe(false);
  });
});

describe('Test isMatchRegex', () => {
  it('Should return true if the value is a string', () => {
    const stringValue = 'aaa';
    expect(isMatchRegex(REGEX.ALPHABETS, stringValue)).toBe(true);
  });

  it('Should return false if the value is negative number', () => {
    const negativeValue = '-222';
    expect(isMatchRegex(REGEX.ALPHABETS, negativeValue)).toBe(false);
  });

  it('Should return false if the value is zero number', () => {
    const zeroValue = '0';
    expect(isMatchRegex(REGEX.ALPHABETS, zeroValue)).toBe(false);
  });

  it('Should return false if the value is decimal number', () => {
    const decimalValue = '2.2';
    expect(isMatchRegex(REGEX.ALPHABETS, decimalValue)).toBe(false);
  });

  it('Should return false if the value is not integer number', () => {
    const integerValue = '222';
    expect(isMatchRegex(REGEX.ALPHABETS, integerValue)).toBe(false);
  });
});

describe('Test validation', () => {
  it('Should return message error required for empty value', () => {
    const emptyValue = '';
    const errors = validation(emptyValue);

    expect(errors).toContain(MESSAGE_ERRORS.REQUIRED);
  });

  it('Should return message error minimum length for value less than 3', () => {
    const valueLessThanThree = 'ab';
    const errors = validation(valueLessThanThree, true);

    expect(errors).toContain(MESSAGE_ERRORS.MIN_LENGTH);
  });

  it('Should return alphabets error for non-alphabetic value', () => {
    const nonAlphabeticValue = '123';
    const errors = validation(nonAlphabeticValue);

    expect(errors).toContain(MESSAGE_ERRORS.ALPHABETS);
  });

  it('Should return no error for empty value', () => {
    const emptyValue = '     ';
    const errors = validation(emptyValue);

    expect(errors).toEqual([]);
  });

  it('Should return no error for valid value', () => {
    const validValue = 'abc';
    const errors = validation(validValue);

    expect(errors).toEqual([]);
  });
});
