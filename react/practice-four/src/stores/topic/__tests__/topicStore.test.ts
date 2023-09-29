import { act, renderHook } from '@testing-library/react';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Hooks
import { useTopicStores } from '..';

describe('Test useTopicStores', () => {
  it('Initial value of useTopicStores', () => {
    const { result } = renderHook(() => useTopicStores());

    expect(result.current.topics).toEqual([]);
  });

  it('Should change value of topics when set topics value', () => {
    const { result } = renderHook(() => useTopicStores());

    expect(result.current.topics).toEqual([]);
    act(() => result.current.setTopics(MOCK_TOPICS));
    expect(result.current.topics).toEqual(MOCK_TOPICS);
  });

  it('Should add more value when add topic', () => {
    const { result } = renderHook(() => useTopicStores());

    act(() => result.current.setTopics(MOCK_TOPICS));
    act(() => result.current.addTopics(MOCK_TOPIC));
    expect(result.current.topics).toEqual([...MOCK_TOPICS, MOCK_TOPIC]);
  });
});
