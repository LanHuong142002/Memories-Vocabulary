// Interface
import { Topic } from '@interfaces';

// Stores
import { ActionTopics } from '@stores';

// Constants
import { TOPIC_ACTIONS } from '@constants';

export interface TopicsState {
  topics: Topic[];
}

export const initialTopicState: TopicsState = {
  topics: [],
};

/**
 * @description Reducer function for managing the topics state.
 *
 * @param {TopicsState} state - Current state of the topics.
 * @param {TopicActions} actions - Actions dispatched to modify the state.
 * @returns {TopicsState} - Updated state of the topics.
 */
export const topicReducer = (
  state: TopicsState = initialTopicState,
  actions: ActionTopics,
): TopicsState => {
  switch (actions.type) {
    case TOPIC_ACTIONS.GET:
      return {
        ...state,
        topics: actions.payload.topics,
      };

    case TOPIC_ACTIONS.POST:
      return {
        ...state,
        topics: actions.payload.topics,
      };

    default:
      return state;
  }
};
