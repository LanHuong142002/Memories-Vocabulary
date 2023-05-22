import fetchMock from 'jest-fetch-mock';
import { MockResponseInit, enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

// Constants
import { MOCK_STATUS_API } from '@constants';

// Services
import { getStatuses } from '@services';

describe('Testing getStatuses', () => {
  beforeEach(() => {
    fetchMock.mockResponse((): Promise<MockResponseInit> => {
      return new Promise((resolve) =>
        resolve({
          body: JSON.stringify(MOCK_STATUS_API),
        }),
      );
    });
  });

  it('Should return a list of statuses when calling API success', async () => {
    const result = await getStatuses();

    expect(result).toEqual(MOCK_STATUS_API);
  });

  it('Should return an error message when calling API fails', async () => {
    const expectedErrorMessage = '500 Internal Server Error';
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          body: JSON.stringify(MOCK_STATUS_API),
        });
      });
    });

    const result = await getStatuses();

    expect(result).toEqual(expectedErrorMessage);
  });
});
