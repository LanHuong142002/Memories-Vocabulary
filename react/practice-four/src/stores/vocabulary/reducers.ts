// Interface
import { Vocabulary } from '@interfaces';

// Stores
import { ActionVocabularies } from '@stores';

// Constants
import { VOCABULARY_ACTIONS } from '@constants';

export interface VocabularyState {
  isLoading: boolean;
  isAdding: boolean;
  deletingById: {
    string?: boolean;
  };
  isLoadingLoadMore: boolean;
  errors: string;
  vocabularies: Vocabulary[];
}

export const initialVocabularyState: VocabularyState = {
  isLoading: false,
  isAdding: false,
  deletingById: {},
  isLoadingLoadMore: false,
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
        isLoadingLoadMore: true,
      };
    case VOCABULARY_ACTIONS.DELETE_REQUEST:
      return {
        ...state,
        deletingById: {
          [actions.payload.vocabularyId]: true,
        },
      };
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
        isLoadingLoadMore: false,
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
    case VOCABULARY_ACTIONS.ADD_FAILURE:
    case VOCABULARY_ACTIONS.GET_FAILURE:
      return {
        ...state,
        errors: actions.payload.errors,
        isLoading: false,
        isAdding: false,
        isLoadingLoadMore: false,
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
