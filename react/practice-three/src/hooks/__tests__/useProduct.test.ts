import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';

// Constants
import { MOCK_PRODUCT_API, MOCK_PRODUCT_DATA } from '@constants';

// Hooks
import { useProduct } from '@hooks';

jest.mock('swr');

describe('Testing useProduct', () => {
  it('Should return data, error, and isLoading when calling useProduct', () => {
    const mockError = null;
    const mockIsLoading = false;

    (useSWR as jest.Mock).mockReturnValue({
      data: MOCK_PRODUCT_API,
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useProduct());

    expect(result.current.data).toEqual(MOCK_PRODUCT_API);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toEqual(mockIsLoading);
  });
});

describe('Testing useProductById', () => {
  it('Should return data, error, and isLoading when calling useProductById', () => {
    const mockError = null;
    const mockIsLoading = false;

    (useSWR as jest.Mock).mockReturnValue({
      data: MOCK_PRODUCT_DATA,
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useProduct());

    expect(result.current.data).toEqual(MOCK_PRODUCT_DATA);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toEqual(mockIsLoading);
  });
});
