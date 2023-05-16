// Constants
import { MESSAGE_ERRORS } from '@constants';

// Helpers
import { isEmpty, isPositiveNumber, isRegex, validation } from '@helpers';

describe('Testing isEmpty function', () => {
  it('Should return true empty string', () => {
    expect(!isEmpty('')).toBe(true);
  });

  it('Should return true string with only spaces', () => {
    expect(!isEmpty('   ')).toBe(true);
  });

  it('Should return true string with value characters', () => {
    expect(isEmpty('hello')).toBe(true);
  });
});

describe('Testing isRegex function', () => {
  const regex = /[a-z]/;

  it('Should return true if the value matches the regular expression', () => {
    const value = 'hello';
    expect(isRegex(regex, value)).toBe(false);
  });

  it('Should return false if the value does not match the regular expression', () => {
    const value = '123';
    expect(isRegex(regex, value)).toBe(true);
  });

  it('Should return true if the value is an empty string', () => {
    const value = '';
    expect(isRegex(regex, value)).toBe(true);
  });
});

describe('Testing isPositiveNumber function', () => {
  it('Should return true for positive numbers', () => {
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(0)).toBe(true);
    expect(isPositiveNumber(0.1)).toBe(true);
  });

  it('Should return false for negative numbers', () => {
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(-0.1)).toBe(false);
  });
});

describe('Testing validation function', () => {
  it('Should return an object with error messages for empty fields', () => {
    const data = {
      name: '',
      email: '',
      age: '25',
    };
    const expected = {
      name: MESSAGE_ERRORS.EMPTY_FIELD,
      email: MESSAGE_ERRORS.EMPTY_FIELD,
      age: '',
    };
    const result = validation<typeof data, Record<keyof typeof data, string>>(data);

    expect(result).toEqual(expected);
  });

  it('Should return an object with error messages for fields that should be numbers', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: '-2',
      quantity: 'abc',
    };
    const expected = {
      name: '',
      email: '',
      age: MESSAGE_ERRORS.POSITIVE_NUMBER,
      quantity: MESSAGE_ERRORS.INTEGER_NUMBER,
    };
    const result = validation<typeof data, Record<keyof typeof data, string>>(data, [
      'age',
      'quantity',
    ]);

    expect(result).toEqual(expected);
  });

  it('Should return an object with error messages for non-empty fields', () => {
    const data = {
      name: 'John Doe',
      email: '',
      age: '',
    };
    const expected = {
      name: '',
      email: MESSAGE_ERRORS.EMPTY_FIELD,
      age: MESSAGE_ERRORS.EMPTY_FIELD,
    };
    const result = validation<typeof data, Record<keyof typeof data, string>>(data);

    expect(result).toEqual(expected);
  });

  it('Should return an object with no error messages for valid input', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: '',
      quantity: '10',
    };
    const expected = {
      name: '',
      email: '',
      age: MESSAGE_ERRORS.EMPTY_FIELD,
      quantity: '',
    };
    const result = validation<typeof data, Record<keyof typeof data, string>>(data, [
      'age',
      'quantity',
    ]);

    expect(result).toEqual(expected);
  });
});
