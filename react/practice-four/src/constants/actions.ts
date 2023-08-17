export enum TOPIC_ACTIONS {
  // ADD
  ADD_REQUEST = 'add_topic_request',
  ADD_SUCCESS = 'add_topic_success',
  ADD_FAILURE = 'add_topic_failure',

  // GET
  GET_REQUEST = 'get_topics_request',
  GET_SUCCESS = 'get_topics_success',
  GET_FAILURE = 'get_topics_failure',
}

export enum VOCABULARY_ACTIONS {
  // ADD
  ADD_REQUEST = 'add_vocabulary_request',
  ADD_SUCCESS = 'add_vocabulary_success',
  ADD_FAILURE = 'add_vocabulary_failure',

  // GET
  GET_REQUEST = 'get_vocabularies_request',
  GET_SUCCESS = 'get_vocabularies_success',
  GET_FAILURE = 'get_vocabularies_failure',

  // DELETE
  DELETE_REQUEST = 'delete_vocabulary_request',
  DELETE_SUCCESS = 'delete_vocabulary_success',
  DELETE_FAILURE = 'delete_vocabulary_failure',
}
