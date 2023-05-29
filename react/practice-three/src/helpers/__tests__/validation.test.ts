// Constants
import { MESSAGE_ERRORS, REGEX } from '@constants';

// Helpers
import {
  isEmpty,
  isPositiveNumber,
  isMatchRegex,
  validateNumberField,
  validateStringField,
} from '@helpers';

describe('Testing isEmpty', () => {
  it('Should return true with empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('Should return false with number', () => {
    expect(isEmpty(2)).toBe(false);
  });

  it('Should return false string with value characters', () => {
    expect(isEmpty('hello')).toBe(false);
  });
});

describe('Testing isMatchRegex', () => {
  it('Should return true if the value is the integer number', () => {
    const value = '222';
    expect(isMatchRegex(REGEX.INTEGER_NUMBER, value)).toBe(true);
  });

  it('Should return false if the value is not integer number', () => {
    const value = '123.2';
    expect(isMatchRegex(REGEX.INTEGER_NUMBER, value)).toBe(false);
  });

  it('Should return true if the value has space at the begin and end', () => {
    const value = 'abc   ';
    expect(isMatchRegex(REGEX.EMPTY_SPACE, value)).toBe(true);
  });
});

describe('Testing isPositiveNumber', () => {
  it('Should return true for positive numbers', () => {
    expect(isPositiveNumber(1)).toBe(true);
  });

  it('Should return false for negative numbers', () => {
    expect(isPositiveNumber(-1)).toBe(false);
  });
});

describe('Testing validateNumberField', () => {
  it('Should return an error message if is not integer number', () => {
    const message = validateNumberField(2.2, 'quantity');

    expect(message).toBe(MESSAGE_ERRORS.INTEGER_NUMBER);
  });

  it('Should return an error message if is not positive number', () => {
    const message = validateNumberField(-22);

    expect(message).toBe(MESSAGE_ERRORS.POSITIVE_NUMBER);
  });

  it('Should return an empty string if valid', () => {
    const message = validateNumberField(22);

    expect(message).toBe('');
  });
});

describe('Testing validateStringField', () => {
  it('Should return an error message if is empty field', () => {
    const message = validateStringField('');

    expect(message).toBe(MESSAGE_ERRORS.EMPTY_FIELD);
  });

  it('Should return an error message if it has empty spaces at the beginning and end', () => {
    const message = validateStringField('123   ');

    expect(message).toBe(MESSAGE_ERRORS.EMPTY_SPACE);
  });

  it('Should return an empty string if it valid', () => {
    const message = validateStringField('123');

    expect(message).toBe('');
  });
});
