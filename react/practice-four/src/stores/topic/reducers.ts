// Interface
import { Topic } from '@interfaces';

// Stores
import { ActionTopics, FailedTopic, GetTopics } from '@stores';

// Constants
import { TOPIC_ACTIONS } from '@constants';

export interface TopicsState {
  isLoading: boolean;
  errors: string;
  topics: Topic[];
}

export const initialTopicState: TopicsState = {
  isLoading: false,
  errors: '',
  topics: [],
};

/**
 * @description Reducer function for managing the topics state.
 *
 * @param {TopicsState} state - Current state of the topics.
 * @param {TopicActions} actions - Actions dispatched to modify the state.
 *
 * @returns {TopicsState} - Updated state of the topics.
 */
export const topicReducer = (
  state: TopicsState = initialTopicState,
  actions: ActionTopics,
): TopicsState => {
  switch (actions.type) {
    case TOPIC_ACTIONS.PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case TOPIC_ACTIONS.GET:
      return {
        ...state,
        topics: (actions as GetTopics).payload.topics,
        isLoading: false,
      };
    case TOPIC_ACTIONS.POST:
      return {
        ...state,
        topics: (actions as GetTopics).payload.topics,
        isLoading: false,
      };
    case TOPIC_ACTIONS.FAILED:
      return {
        ...state,
        errors: (actions as FailedTopic).payload.errors,
        isLoading: false,
      };
    default:
      return state;
  }
};
