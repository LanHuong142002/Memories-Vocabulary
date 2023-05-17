// Constants
import { MESSAGE_ERRORS, REGEX } from '@constants';

// Helpers
import { isEmpty, isPositiveNumber, isMatchRegex, validation } from '@helpers';

describe('Testing isEmpty function', () => {
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

describe('Testing isRegex function', () => {
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

describe('Testing isPositiveNumber function', () => {
  it('Should return true for positive numbers', () => {
    expect(isPositiveNumber(1)).toBe(true);
  });

  it('Should return false for negative numbers', () => {
    expect(isPositiveNumber(-1)).toBe(false);
  });
});

describe('Testing validation function', () => {
  interface Data {
    name: string;
    email: string;
    age: number;
    quantity?: number;
  }

  interface MessageError {
    name: string;
    email: string;
    age: string;
    quantity?: string;
  }

  it('Should return an object with error messages for empty fields', () => {
    const data = {
      name: '',
      email: '',
      age: 25,
    };
    const expected = {
      name: MESSAGE_ERRORS.EMPTY_FIELD,
      email: MESSAGE_ERRORS.EMPTY_FIELD,
      age: '',
    };
    const result = validation<Data, MessageError>(data);

    expect(result).toEqual(expected);
  });

  it('Should return an object with error messages for fields that should be an integer numbers', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 2,
      quantity: 2.2,
    };
    const expected = {
      name: '',
      email: '',
      age: '',
      quantity: MESSAGE_ERRORS.INTEGER_NUMBER,
    };
    const result = validation<Data, MessageError>(data, ['age', 'quantity']);

    expect(result).toEqual(expected);
  });

  it('Should return an object with error messages for fields that should be a positive numbers', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: -2,
      quantity: 22,
    };
    const expected = {
      name: '',
      email: '',
      age: MESSAGE_ERRORS.POSITIVE_NUMBER,
      quantity: '',
    };
    const result = validation<Data, MessageError>(data, ['age', 'quantity']);

    expect(result).toEqual(expected);
  });

  it('Should return an object with error messages for empty space', () => {
    const data = {
      name: 'John Doe',
      email: '  john.doe@example.com  ',
      age: 0,
      quantity: 10,
    };
    const expected = {
      name: '',
      email: MESSAGE_ERRORS.EMPTY_SPACE,
      age: MESSAGE_ERRORS.EMPTY_FIELD,
      quantity: '',
    };
    const result = validation<Data, MessageError>(data, ['age', 'quantity']);

    expect(result).toEqual(expected);
  });
});
