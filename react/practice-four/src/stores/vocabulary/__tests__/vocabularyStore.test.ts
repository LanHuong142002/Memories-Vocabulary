import { act, renderHook } from '@testing-library/react';

// Mocks
import { MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Hooks
import { useVocabulariesStores } from '..';

describe('Test useVocabulariesStores', () => {
  it('Initial value of useVocabulariesStores', () => {
    const { result } = renderHook(() => useVocabulariesStores());

    expect(result.current.vocabularies).toEqual([]);
    expect(result.current.quizzes).toEqual([]);
  });

  it('Should change value of topics when set vocabularies value', () => {
    const { result } = renderHook(() => useVocabulariesStores());

    expect(result.current.vocabularies).toEqual([]);
    act(() => result.current.setVocabularies(MOCK_VOCABULARIES));
    expect(result.current.vocabularies).toEqual(MOCK_VOCABULARIES);
  });

  it('Should change value of quizzes when set quizzes value', () => {
    const { result } = renderHook(() => useVocabulariesStores());

    expect(result.current.quizzes).toEqual([]);
    act(() => result.current.setQuizzes(MOCK_VOCABULARIES));
    expect(result.current.vocabularies).toEqual(MOCK_VOCABULARIES);
  });

  it('Should add more value when add vocabulary', () => {
    const { result } = renderHook(() => useVocabulariesStores());

    act(() => result.current.setVocabularies(MOCK_VOCABULARIES));
    act(() => result.current.onAddVocabularies(MOCK_VOCABULARY));
    expect(result.current.vocabularies).toEqual([...MOCK_VOCABULARIES, MOCK_VOCABULARY]);
  });

  it('Should delete value when delete vocabulary', () => {
    const { result } = renderHook(() => useVocabulariesStores());

    act(() => result.current.setVocabularies(MOCK_VOCABULARIES));
    act(() => result.current.onDeleteVocabularies('1'));
    expect(result.current.vocabularies.length).toEqual(MOCK_VOCABULARIES.length - 1);
  });

  it('Should random value of quizzes when call function random quizzes', () => {
    const { result } = renderHook(() => useVocabulariesStores());
    const vocabularies = [
      MOCK_VOCABULARY,
      {
        ...MOCK_VOCABULARY,
        id: '10',
      },
    ];
    act(() => result.current.setQuizzes(vocabularies));
    expect(result.current.quizzes[0]).toEqual(MOCK_VOCABULARY);
    act(() => result.current.onRandomQuizzes(vocabularies));
    expect(result.current.quizzes.length).toEqual(2);
  });
});
