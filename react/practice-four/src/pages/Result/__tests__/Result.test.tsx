import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Contexts
import { ThemeProvider, VocabularyContext, VocabularyContextType } from '@contexts';

// Mocks
import { MOCK_VOCABULARIES, MOC_RESULT, MOC_TABLE_RESULT } from '@mocks';

// Components
import { Result } from '@pages';

const mockVocabularyContext = {
  isLoadingVocabularies: false,
  isLoadingMore: false,
  isAdding: false,
  isLoadingQuizzes: false,
  errorsVocabulary: '',
  deletingById: {
    5: false,
  },
  vocabularies: MOCK_VOCABULARIES,
  quizzes: MOC_TABLE_RESULT,
  onAddTopic: jest.fn(),
  onAddVocabulary: jest.fn(),
  onDeleteVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
  onLoadMore: jest.fn(),
};

const ResultComponent = ({
  children,
  value = mockVocabularyContext,
}: {
  children: ReactNode;
  value?: VocabularyContextType;
}) => (
  <BrowserRouter>
    <ThemeProvider>
      <VocabularyContext.Provider value={value}>{children}</VocabularyContext.Provider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Test Result component', () => {
  it('Should render Result component', () => {
    const { container } = render(
      <ResultComponent>
        <Result />
      </ResultComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should navigate to vocabulary list when quizzes length less than 0', () => {
    const { container } = render(
      <ResultComponent value={{ ...mockVocabularyContext, quizzes: [] }}>
        <Result />
      </ResultComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should use empty string when quizzes have one quiz dont have value', () => {
    const { container } = render(
      <ResultComponent
        value={{
          ...mockVocabularyContext,
          quizzes: [{ ...MOC_RESULT, answer: undefined }],
        }}
      >
        <Result />
      </ResultComponent>,
    );

    expect(container).toBeInTheDocument();
  });
});
