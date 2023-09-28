import { renderHook, waitFor } from '@testing-library/react';

// Hooks
import { useInfiniteVocabularies, useTopics, useVocabularies } from '@hooks';

// Services
import * as services from '@services';

// Mocks
import { MOCK_TOPICS, MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Helpers
import { wrapper } from '@helpers';

jest.mock('@services', () => ({
  __esModule: true,
  ...jest.requireActual('@services'),
}));

describe('Test useTopics', () => {
  it('Should return data and isSuccess is true when call useTopics success', async () => {
    jest.spyOn(services, 'getData').mockResolvedValue(MOCK_TOPICS);
    const { result } = renderHook(() => useTopics(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_TOPICS);
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  it('Should return error and isSuccess is false when call useTopics failed', async () => {
    jest.spyOn(services, 'getData').mockRejectedValue(new Error('Error'));
    const { result } = renderHook(() => useTopics(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.isSuccess).toEqual(false);
      expect(result.current.error?.message).toEqual('Error');
    });
  });
});

describe('Test useVocabularies', () => {
  it('Should return data and isSuccess is true when call useVocabularies success', async () => {
    jest.spyOn(services, 'getData').mockResolvedValue(MOCK_VOCABULARIES);
    const { result } = renderHook(() => useVocabularies('1', true), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_VOCABULARIES);
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  it('Should return error and isSuccess is false when call useVocabularies failed', async () => {
    jest.spyOn(services, 'getData').mockRejectedValue(new Error('Error'));
    const { result } = renderHook(() => useVocabularies('1', true), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.isSuccess).toEqual(false);
      expect(result.current.error?.message).toEqual('Error');
    });
  });
});

describe('Test useInfiniteVocabularies', () => {
  it('Should return data and isSuccess is true when call useInfiniteVocabularies success', async () => {
    const mockVocabulariesMoreThan20 = [
      ...Array.from({ length: 25 }, (_, index) => ({
        ...MOCK_VOCABULARY,
        id: `id_${index + 1}`,
      })),
    ];
    jest.spyOn(services, 'getData').mockResolvedValue(mockVocabulariesMoreThan20);
    const { result } = renderHook(() => useInfiniteVocabularies('1'), { wrapper });

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(mockVocabulariesMoreThan20);
      expect(result.current.isSuccess).toEqual(true);
    });

    result.current.fetchNextPage();
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('Should return error and isSuccess is false when call useInfiniteVocabularies failed', async () => {
    jest.spyOn(services, 'getData').mockRejectedValue(new Error('Error'));
    const { result } = renderHook(() => useInfiniteVocabularies('1'), { wrapper });

    await waitFor(() => {
      expect(result.current.data?.pages).toEqual(undefined);
      expect(result.current.isSuccess).toEqual(false);
      expect(result.current.error?.message).toEqual('Error');
    });
  });
});
