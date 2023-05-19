import fetchMock from 'jest-fetch-mock';
import { MockResponseInit, enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

// Constants
import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA } from '@constants';

// Services
import { deleteProduct, getProductsByParam, postProduct, updateProduct } from '@services';

describe('Testing getProductsByParam', () => {
  const param = 'test param';

  beforeEach(() => {
    fetchMock.mockResponse((): Promise<MockResponseInit> => {
      return new Promise((resolve) =>
        resolve({
          body: JSON.stringify(MOCK_PRODUCT_API),
        }),
      );
    });
  });

  it('Should return a list of products', async () => {
    const result = await getProductsByParam(param);

    expect(result).toEqual(MOCK_PRODUCT_API);
  });

  it('Should return an error message if the API call fails', async () => {
    const expectedErrorMessage = '500 Internal Server Error';
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          body: JSON.stringify(MOCK_PRODUCT_API),
        });
      });
    });

    const result = await getProductsByParam(param);

    expect(result).toEqual(expectedErrorMessage);
  });
});

describe('Testing postProduct', () => {
  beforeEach(() => {
    fetchMock.mockResponse((): Promise<MockResponseInit> => {
      return new Promise((resolve) =>
        resolve({
          body: JSON.stringify(MOCK_PRODUCT_DATA),
        }),
      );
    });
  });

  it('Should return a product', async () => {
    const result = await postProduct(MOCK_PRODUCT_DATA);

    expect(result).toEqual(MOCK_PRODUCT_DATA);
  });

  it('Should return a message error if the API call fails', async () => {
    const expectedErrorMessage = '500 Internal Server Error';
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          body: JSON.stringify(MOCK_PRODUCT_API),
        });
      });
    });
    const result = await postProduct(MOCK_PRODUCT_DATA);

    expect(result).toEqual(expectedErrorMessage);
  });
});

describe('Testing function deleteProduct', () => {
  const id = '08637ccd-729e-4349-82fd-b47933f8d455';

  beforeEach(() => {
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          body: JSON.stringify(MOCK_PRODUCT_DATA),
        });
      });
    });
  });

  it('Should remove a product', async () => {
    const result = await deleteProduct(id);

    expect(result).toEqual(MOCK_PRODUCT_DATA);
  });

  it('Should return an error message if the API call fails', async () => {
    const expectedErrorMessage = '500 Internal Server Error';
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          body: JSON.stringify({}),
        });
      });
    });

    const result = await deleteProduct(id);

    expect(result).toEqual(expectedErrorMessage);
  });
});

describe('Testing updateProduct', () => {
  const id = '08637ccd-729e-4349-82fd-b47933f8d455';
  beforeEach(() => {
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          body: JSON.stringify(MOCK_PRODUCT_DATA),
        });
      });
    });
  });

  it('Should update a product', async () => {
    const updatedProduct = await updateProduct(id, MOCK_PRODUCT_DATA);

    expect(updatedProduct).toEqual(MOCK_PRODUCT_DATA);
  });

  it('Should handle errors', async () => {
    const errorMessage = '500 Internal Server Error';
    fetchMock.mockResponse(async () => {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          body: JSON.stringify({ message: errorMessage }),
        });
      });
    });

    const result = await updateProduct(id, MOCK_PRODUCT_DATA);

    expect(result).toEqual(errorMessage);
  });
});
