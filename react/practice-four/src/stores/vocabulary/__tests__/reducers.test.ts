// Constants
import { VOCABULARY_ACTIONS } from '@constants';

// Mocks
import { MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Stores
import { vocabularyReducer, initialVocabularyState, ActionVocabularies } from '@stores';

describe('Test vocabulary reducer', () => {
  it('Should return the initial state', () => {
    const initialState = vocabularyReducer(undefined, {} as ActionVocabularies);

    expect(initialState).toEqual(initialVocabularyState);
  });

  it('Should handle get vocabularies success', () => {
    const state = vocabularyReducer(initialVocabularyState, {
      type: VOCABULARY_ACTIONS.GET_SUCCESS,
      payload: {
        vocabularies: MOCK_VOCABULARIES,
      },
    });

    expect(state.isLoading).toBe(false);
    expect(state.vocabularies.length).toBe(MOCK_VOCABULARIES.length);
  });

  it('Should handle get more vocabularies success', () => {
    const state = vocabularyReducer(initialVocabularyState, {
      type: VOCABULARY_ACTIONS.GET_MORE_SUCCESS,
      payload: {
        vocabularies: MOCK_VOCABULARIES,
      },
    });

    expect(state.isLoadingMore).toBe(false);
    expect(state.vocabularies.length).toBe(MOCK_VOCABULARIES.length);
  });

  // ADD
  it('Should handle add vocabulary request', () => {
    const state = vocabularyReducer(initialVocabularyState, {
      type: VOCABULARY_ACTIONS.ADD_REQUEST,
    });

    expect(state.isAdding).toBe(true);
  });

  it('Should handle add vocabulary success', () => {
    const state = vocabularyReducer(initialVocabularyState, {
      type: VOCABULARY_ACTIONS.ADD_SUCCESS,
      payload: {
        vocabulary: MOCK_VOCABULARY,
      },
    });

    expect(state.isAdding).toBe(false);
    expect(state.vocabularies.length).toBe(MOCK_VOCABULARIES.length);
  });

  it('Should handle add vocabulary failure', () => {
    const error = 'Something went wrong!';
    const state = vocabularyReducer(initialVocabularyState, {
      type: VOCABULARY_ACTIONS.ADD_FAILURE,
      payload: {
        errors: error,
      },
    });

    expect(state.isAdding).toBe(false);
    expect(state.errors).toBe(error);
  });

  // DELETE
  it('Should handle delete vocabulary success', () => {
    const state = vocabularyReducer(
      {
        ...initialVocabularyState,
        vocabularies: MOCK_VOCABULARIES,
      },
      {
        type: VOCABULARY_ACTIONS.DELETE_SUCCESS,
        payload: {
          vocabularyId: '1',
        },
      },
    );

    expect(state.vocabularies.length).toBe(MOCK_VOCABULARIES.length - 1);
  });
});
