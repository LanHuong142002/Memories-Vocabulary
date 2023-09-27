import { renderHook, waitFor } from '@testing-library/react';

// Hooks
import {
  useMutationDeleteVocabulary,
  useMutationPostTopic,
  useMutationPostVocabulary,
} from '@hooks';

// Services
import * as services from '@services';

// Mocks
import { MOCK_TOPIC, MOCK_VOCABULARY } from '@mocks';

// Helpers
import { wrapper } from '@helpers';

jest.mock('@services', () => ({
  __esModule: true,
  ...jest.requireActual('@services'),
}));

describe('Test useMutationPostTopic', () => {
  it('Should return data and isSuccess is true when call useMutationPostTopic success', async () => {
    jest.spyOn(services, 'postData').mockResolvedValue(MOCK_TOPIC);

    const { result } = renderHook(() => useMutationPostTopic(), { wrapper });
    result.current.mutate(MOCK_TOPIC);

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_TOPIC);
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  it('Should return error and isSuccess is false when call useMutationPostTopic failed', async () => {
    jest.spyOn(services, 'postData').mockRejectedValue(new Error('Error'));

    const { result } = renderHook(() => useMutationPostTopic(), { wrapper });
    result.current.mutate(MOCK_TOPIC);

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.isSuccess).toEqual(false);
      expect(result.current.error?.message).toEqual('Error');
    });
  });
});

describe('Test useMutationPostVocabulary', () => {
  it('Should return data and isSuccess is true when call useMutationPostVocabulary success', async () => {
    jest.spyOn(services, 'postData').mockResolvedValue(MOCK_VOCABULARY);

    const { result } = renderHook(() => useMutationPostVocabulary('1'), { wrapper });
    result.current.mutate(MOCK_VOCABULARY);

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_VOCABULARY);
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  it('Should return error and isSuccess is false when call useMutationPostVocabulary failed', async () => {
    jest.spyOn(services, 'postData').mockRejectedValue(new Error('Error'));

    const { result } = renderHook(() => useMutationPostVocabulary('1'), { wrapper });
    result.current.mutate(MOCK_VOCABULARY);

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.isSuccess).toEqual(false);
      expect(result.current.error?.message).toEqual('Error');
    });
  });
});

describe('Test useMutationDeleteVocabulary', () => {
  it('Should return data and isSuccess is true when call useMutationDeleteVocabulary success', async () => {
    jest.spyOn(services, 'deleteData').mockResolvedValue(MOCK_VOCABULARY);

    const { result } = renderHook(() => useMutationDeleteVocabulary('1'), { wrapper });
    result.current.mutate('1');

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });
  });

  it('Should return error and isSuccess is false when call useMutationDeleteVocabulary failed', async () => {
    jest.spyOn(services, 'deleteData').mockRejectedValue(new Error('Error'));

    const { result } = renderHook(() => useMutationDeleteVocabulary('1'), { wrapper });
    result.current.mutate('1');

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.isSuccess).toEqual(false);
      expect(result.current.error?.message).toEqual('Error');
    });
  });
});
