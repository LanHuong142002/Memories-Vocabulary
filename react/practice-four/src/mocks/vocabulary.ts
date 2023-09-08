import { MOCK_TABLE_RESULT } from './tableResult';

export const MOCK_VOCABULARY = {
  english: 'english 1',
  vietnamese: 'vietnamese 1',
  id: '1',
  topicId: '1',
};

export const MOCK_VOCABULARIES = [MOCK_VOCABULARY];

export const MOCK_VOCABULARY_CONTEXT_VALUE = {
  isLoadingVocabularies: false,
  isLoadingMore: false,
  isAdding: false,
  isLoadingQuizzes: false,
  errorsVocabulary: '',
  deletingById: {
    5: false,
  },
  vocabularies: MOCK_VOCABULARIES,
  quizzes: MOCK_TABLE_RESULT,
  onAddTopic: jest.fn(),
  onAddVocabulary: jest.fn(),
  onDeleteVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
  onLoadMore: jest.fn(),
  onCheckEnglishIsExisted: jest.fn(),
};
