import { customMessageErrors } from '@helpers';

describe('Testing function customMessageErrors', () => {
  it('Should return "400 Bad Request" when status is 400', () => {
    const response = { status: 400 } as Response;
    expect(customMessageErrors(response)).toEqual('400 Bad Request');
  });

  it('Should return "401 Unauthorized" when status is 401', () => {
    const response = { status: 401 } as Response;
    expect(customMessageErrors(response)).toEqual('401 Unauthorized');
  });

  it('Should return "403 Forbidden" when status is 403', () => {
    const response = { status: 403 } as Response;
    expect(customMessageErrors(response)).toEqual('403 Forbidden');
  });

  it('Should return "404 Page Not Found" when status is 404', () => {
    const response = { status: 404 } as Response;
    expect(customMessageErrors(response)).toEqual('404 Page Not Found');
  });

  it('Should return "500 Internal Server Error" when status is 500', () => {
    const response = { status: 500 } as Response;
    expect(customMessageErrors(response)).toEqual('500 Internal Server Error');
  });

  it('Should return "503 Service Unavailable" when status is 503', () => {
    const response = { status: 503 } as Response;
    expect(customMessageErrors(response)).toEqual('503 Service Unavailable');
  });

  it('Should return "xxx Fail to fetch" when status is not recognized', () => {
    const response = { status: 999 } as Response;
    expect(customMessageErrors(response)).toEqual('999 Fail to fetch');
  });
});
