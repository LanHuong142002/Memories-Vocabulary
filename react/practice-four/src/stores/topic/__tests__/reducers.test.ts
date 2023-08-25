// Constants
import { TOPIC_ACTIONS } from '@constants';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Stores
import { topicReducer, initialTopicState, ActionTopics } from '@stores';

describe('Test topic reducer', () => {
  it('Should return the initial state', () => {
    const initialState = topicReducer(undefined, {} as ActionTopics);

    expect(initialState).toEqual(initialTopicState);
  });

  it('Should handle add topic request', () => {
    const state = topicReducer(initialTopicState, {
      type: TOPIC_ACTIONS.ADD_REQUEST,
    });

    expect(state.isLoading).toBe(true);
  });

  it('Should handle add topic success', () => {
    const state = topicReducer(initialTopicState, {
      type: TOPIC_ACTIONS.ADD_SUCCESS,
      payload: {
        topic: MOCK_TOPIC,
      },
    });

    expect(state.isLoading).toBe(false);
    expect(state.topics.length).toBe(MOCK_TOPICS.length);
  });

  it('Should handle add topic failure', () => {
    const error = 'Something went wrong!';
    const state = topicReducer(initialTopicState, {
      type: TOPIC_ACTIONS.ADD_FAILURE,
      payload: {
        errors: error,
      },
    });

    expect(state.isLoading).toBe(false);
    expect(state.errors).toBe(error);
  });
});
