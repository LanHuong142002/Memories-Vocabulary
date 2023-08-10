import { ACTIONS_TOPIC } from '@constants';
import { Topic } from '@interfaces';
import { TopicActions } from './actions';

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
  actions: TopicActions,
): TopicsState => {
  switch (actions.type) {
    case ACTIONS_TOPIC.GET:
      return {
        ...state,
        topics: actions.payload.topics,
      };

    case ACTIONS_TOPIC.POST:
      return {
        ...state,
        topics: actions.payload.topics,
      };

    default:
      return state;
  }
};
