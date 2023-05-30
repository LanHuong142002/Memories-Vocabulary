import fetchMock from 'jest-fetch-mock';
import { MockResponseInit, enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

// Helpers
import { ResponseError } from '@helpers';

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
    let result = '';
    const expectedErrorMessage = '500 Internal Server Error';
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          body: JSON.stringify(MOCK_STATUS_API),
        });
      });
    });

    try {
      await getStatuses();
    } catch (error) {
      return (result = (error as ResponseError).message);
    }

    expect(result).toEqual(expectedErrorMessage);
  });
});
