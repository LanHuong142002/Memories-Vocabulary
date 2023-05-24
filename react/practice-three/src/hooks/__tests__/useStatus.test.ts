import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';

// Constants
import { MOCK_STATUS_API } from '@constants';

// Hooks
import { useStatus } from '@hooks';

jest.mock('swr');

describe('Testing useStatus', () => {
  it('Should return data, error, and isLoading', () => {
    const mockError = null;
    const mockIsLoading = false;

    (useSWR as jest.Mock).mockReturnValue({
      data: MOCK_STATUS_API,
      error: mockError,
      isLoading: mockIsLoading,
    });

    const { result } = renderHook(() => useStatus());

    expect(result.current.data).toEqual(MOCK_STATUS_API);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toEqual(mockIsLoading);
  });
});
