// Constants
import { TOPIC_ACTIONS } from '@constants';

// Interfaces
import { Topic } from '@interfaces';

export type AddTopicsRequest = {
  type: TOPIC_ACTIONS.ADD_REQUEST;
};

export type AddTopicsSuccess = {
  type: TOPIC_ACTIONS.ADD_SUCCESS;
  payload: {
    topic: Topic;
  };
};

export type AddTopicsFailure = {
  type: TOPIC_ACTIONS.ADD_FAILURE;
  payload: {
    errors: string;
  };
};

export type GetTopicsFailure = {
  type: TOPIC_ACTIONS.GET_FAILURE;
  payload: {
    errors: string;
  };
};

export type GetTopicsSuccess = {
  type: TOPIC_ACTIONS.GET_SUCCESS;
  payload: {
    topics: Topic[];
  };
};

export type GetTopicsRequest = {
  type: TOPIC_ACTIONS.GET_REQUEST;
};

export type ActionTopics =
  | AddTopicsRequest
  | AddTopicsSuccess
  | AddTopicsFailure
  | GetTopicsFailure
  | GetTopicsSuccess
  | GetTopicsRequest;
