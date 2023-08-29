// Interface
import { Vocabulary } from '@interfaces';

// Stores
import { ActionVocabularies } from '@stores';

// Constants
import { VOCABULARY_ACTIONS } from '@constants';

// Helpers
import { removeDuplicateObjects } from '@helpers';

export interface VocabularyState {
  isLoading: boolean;
  isAdding: boolean;
  deletingById: {
    [id: string]: boolean;
  };
  isLoadingMore: boolean;
  errors: string;
  vocabularies: Vocabulary[];
}

export const initialVocabularyState: VocabularyState = {
  isLoading: false,
  isAdding: false,
  deletingById: {},
  isLoadingMore: false,
  errors: '',
  vocabularies: [],
};

/**
 * @description Reducer function for managing the vocabularies state.
 *
 * @param {VocabularyState} state - Current state of the vocabularies.
 * @param {VocabularyActions} actions - Actions dispatched to modify the state.
 *
 * @returns {VocabularyState} - Updated state of the vocabularies.
 */
export const vocabularyReducer = (
  state: VocabularyState = initialVocabularyState,
  actions: ActionVocabularies,
): VocabularyState => {
  switch (actions.type) {
    // Request
    case VOCABULARY_ACTIONS.ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
      };
    case VOCABULARY_ACTIONS.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case VOCABULARY_ACTIONS.GET_MORE_REQUEST:
      return {
        ...state,
        isLoadingMore: true,
      };
    case VOCABULARY_ACTIONS.DELETE_REQUEST:
      return {
        ...state,
        deletingById: {
          [actions.payload.vocabularyId]: true,
        },
      };
    // Success
    case VOCABULARY_ACTIONS.ADD_SUCCESS:
      return {
        ...state,
        vocabularies: [...state.vocabularies, actions.payload.vocabulary],
        isAdding: false,
      };
    case VOCABULARY_ACTIONS.GET_SUCCESS:
      return {
        ...state,
        vocabularies: actions.payload.vocabularies,
        isLoading: false,
        isLoadingMore: false,
      };
    case VOCABULARY_ACTIONS.GET_MORE_SUCCESS:
      return {
        ...state,
        vocabularies: removeDuplicateObjects<Vocabulary>(
          state.vocabularies,
          actions.payload.vocabularies,
        ),
        isLoading: false,
        isLoadingMore: false,
      };
    case VOCABULARY_ACTIONS.DELETE_SUCCESS:
      return {
        ...state,
        vocabularies: state.vocabularies.filter(
          (vocab) => vocab.id !== actions.payload.vocabularyId,
        ),
        deletingById: {
          [actions.payload.vocabularyId]: false,
        },
      };
    // Failure
    case VOCABULARY_ACTIONS.ADD_FAILURE:
    case VOCABULARY_ACTIONS.GET_FAILURE:
      return {
        ...state,
        errors: actions.payload.errors,
        isLoading: false,
        isAdding: false,
        isLoadingMore: false,
      };
    case VOCABULARY_ACTIONS.DELETE_FAILURE:
      return {
        ...state,
        errors: actions.payload.errors,
        deletingById: {
          [actions.payload.vocabularyId]: false,
        },
      };
    default:
      return state;
  }
};
