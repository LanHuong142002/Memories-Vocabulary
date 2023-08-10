const COMMON_ACTIONS = {
  PENDING: 'request_pending',
  FAILED: 'request_failed',
};

export const TOPIC_ACTIONS = {
  GET: 'get_topics',
  POST: 'post_topic',
  ...COMMON_ACTIONS,
};

export const VOCABULARY_ACTIONS = {
  GET: 'get_vocabularies',
  POST: 'post_vocabulary',
  PUT: 'put_vocabulary',
  DELETE: 'delete_vocabulary',
  ...COMMON_ACTIONS,
};
