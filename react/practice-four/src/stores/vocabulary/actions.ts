// Constants
import { VOCABULARY_ACTIONS } from '@constants';

// Interfaces
import { Vocabulary } from '@interfaces';

// ADD
export type AddVocabularyRequest = {
  type: VOCABULARY_ACTIONS.ADD_REQUEST;
};

export type AddVocabularySuccess = {
  type: VOCABULARY_ACTIONS.ADD_SUCCESS;
  payload: {
    vocabulary: Vocabulary;
  };
};

export type AddVocabularyFailure = {
  type: VOCABULARY_ACTIONS.ADD_FAILURE;
  payload: {
    errors: string;
  };
};

// DELETE
export type DeleteVocabularyRequest = {
  type: VOCABULARY_ACTIONS.DELETE_REQUEST;
  payload: {
    vocabularyId: string;
  };
};

export type DeleteVocabularySuccess = {
  type: VOCABULARY_ACTIONS.DELETE_SUCCESS;
  payload: {
    vocabularyId: string;
  };
};

export type DeleteVocabularyFailure = {
  type: VOCABULARY_ACTIONS.DELETE_FAILURE;
  payload: {
    errors: string;
    vocabularyId: string;
  };
};

// GET
export type GetVocabulariesFailure = {
  type: VOCABULARY_ACTIONS.GET_FAILURE;
  payload: {
    errors: string;
  };
};

export type GetVocabulariesSuccess = {
  type: VOCABULARY_ACTIONS.GET_SUCCESS;
  payload: {
    vocabularies: Vocabulary[];
  };
};

export type GetMoreVocabulariesRequest = {
  type: VOCABULARY_ACTIONS.GET_MORE_REQUEST;
};

export type GetVocabulariesRequest = {
  type: VOCABULARY_ACTIONS.GET_REQUEST;
};

export type ActionVocabularies =
  | AddVocabularyRequest
  | AddVocabularySuccess
  | AddVocabularyFailure
  | DeleteVocabularyRequest
  | DeleteVocabularySuccess
  | DeleteVocabularyFailure
  | GetVocabulariesFailure
  | GetVocabulariesSuccess
  | GetVocabulariesRequest
  | GetMoreVocabulariesRequest;
