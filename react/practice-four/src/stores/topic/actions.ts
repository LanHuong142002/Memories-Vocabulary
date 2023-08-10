import { ACTIONS_TOPIC } from '@constants';
import { Topic } from '@interfaces';

export type GetTopics = {
  type: typeof ACTIONS_TOPIC.GET;
  payload: {
    topics: Topic[];
  };
};

export type PostTopic = {
  type: typeof ACTIONS_TOPIC.POST;
  payload: {
    topics: Topic[];
  };
};

export type TopicActions = GetTopics | PostTopic;
