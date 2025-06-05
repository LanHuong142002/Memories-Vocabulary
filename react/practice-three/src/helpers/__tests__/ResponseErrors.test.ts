import { ResponseError } from '@helpers';

describe('Testing class ResponseError', () => {
  it('Should create an instance of ResponseError', () => {
    const error = new ResponseError('Test error message');

    expect(error).toBeInstanceOf(ResponseError);
  });

  it('Should have the correct error message', () => {
    const errorMessage = 'Test error message';
    const error = new ResponseError(errorMessage);

    expect(error.message).toEqual(errorMessage);
  });
});
