// Constants
import { VOCABULARY_ACTIONS } from '@constants';

// Interfaces
import { Vocabulary } from '@interfaces';

export type RequestVocabularies = {
  type: VOCABULARY_ACTIONS.REQUEST;
  payload: {
    vocabularies: Vocabulary[];
  };
};

export type DeleteVocabularies = {
  type: VOCABULARY_ACTIONS.DELETE;
  payload: {
    vocabularyId: string;
  };
};

export type PendingVocabulary = {
  type: VOCABULARY_ACTIONS.PENDING;
};

export type FailedVocabulary = {
  type: VOCABULARY_ACTIONS.FAILED;
  payload: {
    errors: string;
  };
};

export type ActionVocabularies =
  | RequestVocabularies
  | PendingVocabulary
  | FailedVocabulary
  | DeleteVocabularies;
