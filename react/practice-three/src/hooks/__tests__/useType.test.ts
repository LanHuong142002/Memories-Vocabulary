import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';

// Constants
import { MOCK_TYPE_API } from '@constants';

// Hooks
import { useType } from '@hooks';

jest.mock('swr');

describe('Testing useType', () => {
  it('Should return data, error, and isLoading', () => {
    const mockError = null;
    const mockIsLoading = false;

    (useSWR as jest.Mock).mockReturnValue({
      data: MOCK_TYPE_API,
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useType());

    expect(result.current.data).toEqual(MOCK_TYPE_API);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toEqual(mockIsLoading);
  });
});
