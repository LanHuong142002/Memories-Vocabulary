// Interface
import { Vocabulary } from '@interfaces';

// Stores
import { ActionVocabularies } from '@stores';

// Constants
import { VOCABULARY_ACTIONS } from '@constants';

export interface VocabularyState {
  isLoading: boolean;
  isLoadingAdd: boolean;
  deletingById: {
    id: string;
    isLoadingDelete: boolean;
  };
  isLoadingLoadMore: boolean;
  errors: string;
  vocabularies: Vocabulary[];
}

export const initialVocabularyState: VocabularyState = {
  isLoading: false,
  isLoadingAdd: false,
  deletingById: {
    id: '',
    isLoadingDelete: false,
  },
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
        isLoadingAdd: true,
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
          id: actions.payload.vocabularyId,
          isLoadingDelete: true,
        },
      };
    case VOCABULARY_ACTIONS.ADD_SUCCESS:
      return {
        ...state,
        vocabularies: [...state.vocabularies, actions.payload.vocabulary],
        isLoadingAdd: false,
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
          id: actions.payload.vocabularyId,
          isLoadingDelete: false,
        },
      };
    case VOCABULARY_ACTIONS.ADD_FAILURE:
    case VOCABULARY_ACTIONS.GET_FAILURE:
      return {
        ...state,
        errors: actions.payload.errors,
        isLoading: false,
        isLoadingAdd: false,
        isLoadingLoadMore: false,
      };
    case VOCABULARY_ACTIONS.DELETE_FAILURE:
      return {
        ...state,
        errors: actions.payload.errors,
        deletingById: {
          id: actions.payload.vocabularyId,
          isLoadingDelete: false,
        },
      };
    default:
      return state;
  }
};
