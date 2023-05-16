// Constants
import { MESSAGE_ERRORS } from '@constants';

// Helpers
import { checkEmpty, checkNumber, validation } from '@helpers';

describe('Testing checkEmpty', () => {
  it('Should return an error message if the input is empty', () => {
    const value = checkEmpty('');

    expect(value).toEqual(MESSAGE_ERRORS.EMPTY_FIELD);
  });

  it('Should return an empty string if the input is not empty', () => {
    const value = checkEmpty('hello');

    expect(value).toEqual('');
  });
});

describe('Testing checkNumber', () => {
  it('Should return an error message if the input empty', () => {
    const value = checkNumber('name', '');

    expect(value).toEqual(MESSAGE_ERRORS.EMPTY_FIELD);
  });

  it('Should return an error message if the value is not positive number', () => {
    const value = checkNumber('name', '-2');

    expect(value).toEqual(MESSAGE_ERRORS.POSITIVE_NUMBER);
  });

  it('Should return an empty string if the input is not empty', () => {
    const value = checkNumber('name', '123');

    expect(value).toEqual('');
  });

  it('Should return an error if the input is a decimal and the key is the quantity', () => {
    const value = checkNumber('quantity', '123.2');

    expect(value).toEqual(MESSAGE_ERRORS.INTEGER_NUMBER);
  });
});

describe('Testing validation', () => {
  it('should return an object with error messages for empty fields', () => {
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
    const result = validation(data);

    expect(result).toEqual(expected);
  });

  it('should return an object with error messages for fields that should be numbers', () => {
    const data = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: '-2',
    };
    const expected = {
      name: '',
      email: '',
      age: MESSAGE_ERRORS.POSITIVE_NUMBER,
    };
    const result = validation(data, ['age']);

    expect(result).toEqual(expected);
  });
});
