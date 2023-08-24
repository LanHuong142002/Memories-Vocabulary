// Constants
import { MESSAGE_ERRORS, REGEX } from '@constants';

// Helpers
import { isEmpty, isMatchRegex, validation } from '@helpers';

describe('it isEmpty', () => {
  it('Should return true with empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('Should return false string with value characters', () => {
    expect(isEmpty('hello')).toBe(false);
  });
});

describe('Test isMatchRegex', () => {
  it('Should return true if the value is the integer number', () => {
    const value = 'aaa';
    expect(isMatchRegex(REGEX.ALPHABETS, value)).toBe(true);
  });

  it('Should return false if the value is not integer number', () => {
    const value = '222';
    expect(isMatchRegex(REGEX.ALPHABETS, value)).toBe(false);
  });
});

describe('Test validation', () => {
  it('Should return required error for empty value', () => {
    const emptyValue = '';
    const errors = validation(emptyValue);

    expect(errors).toContain(MESSAGE_ERRORS.REQUIRED);
  });

  it('Should return minimum length error for short value', () => {
    const shortValue = 'ab';
    const errors = validation(shortValue, true);

    expect(errors).toContain(MESSAGE_ERRORS.MIN_LENGTH);
  });

  it('Should return alphabets error for non-alphabetic value', () => {
    const nonAlphabeticValue = '123';
    const errors = validation(nonAlphabeticValue);

    expect(errors).toContain(MESSAGE_ERRORS.ALPHABETS);
  });

  it('Should return no error for valid value', () => {
    const validValue = 'abc';
    const errors = validation(validValue);

    expect(errors).toEqual([]);
  });
});
