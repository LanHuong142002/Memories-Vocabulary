// Constants
import { TOPIC_ACTIONS } from '@constants';

// Interfaces
import { Topic } from '@interfaces';

export type RequestTopics = {
  type: TOPIC_ACTIONS.REQUEST;
  payload: {
    topics: Topic[];
  };
};

export type PendingTopic = {
  type: TOPIC_ACTIONS.PENDING;
};

export type FailedTopic = {
  type: TOPIC_ACTIONS.FAILED;
  payload: {
    errors: string;
  };
};

export type ActionTopics = RequestTopics | PendingTopic | FailedTopic;
