// Interface
import { Vocabulary } from '@interfaces';

// Stores
import { ActionVocabularies } from '@stores';

// Constants
import { VOCABULARY_ACTIONS } from '@constants';

export interface VocabularyState {
  isLoading: boolean;
  errors: string;
  vocabularies: Vocabulary[];
}

export const initialVocabularyState: VocabularyState = {
  isLoading: false,
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
    case VOCABULARY_ACTIONS.PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case VOCABULARY_ACTIONS.REQUEST:
      return {
        ...state,
        vocabularies: actions.payload.vocabularies,
        isLoading: false,
      };
    case VOCABULARY_ACTIONS.DELETE:
      return {
        ...state,
        vocabularies: state.vocabularies.filter(
          (vocab) => vocab.id !== actions.payload.vocabularyId,
        ),
        isLoading: false,
      };
    case VOCABULARY_ACTIONS.FAILED:
      return {
        ...state,
        errors: actions.payload.errors,
        isLoading: false,
      };
    default:
      return state;
  }
};
