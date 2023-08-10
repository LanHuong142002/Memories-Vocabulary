// Constants
import { TOPIC_ACTIONS } from '@constants';

// Interfaces
import { Topic } from '@interfaces';

export type GetTopics = {
  type: typeof TOPIC_ACTIONS.GET;
  payload: {
    topics: Topic[];
  };
};

export type PostTopic = {
  type: typeof TOPIC_ACTIONS.POST;
  payload: {
    topics: Topic[];
  };
};

export type PendingTopic = {
  type: typeof TOPIC_ACTIONS.PENDING;
};

export type FailedTopic = {
  type: typeof TOPIC_ACTIONS.FAILED;
  payload: {
    errors: string;
  };
};

export type ActionTopics = GetTopics | PostTopic | PendingTopic | FailedTopic;
