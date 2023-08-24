import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Contexts
import { DictionaryContext, DictionaryType, ThemeProvider } from '@contexts';

// Mocks
import { MOCK_TOPICS, mockTableResult } from '@mocks';

// Components
import { ResultPage } from '@pages';

const mockDictionaryContext = {
  isLoadingTopic: false,
  isLoadingVocabulary: false,
  errorsTopic: '',
  errorsVocabulary: '',
  topics: MOCK_TOPICS,
  vocabularies: mockTableResult,
  quizzes: mockTableResult,
  onAddTopic: jest.fn(),
  onAddVocabulary: jest.fn(),
  onDeleteVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
};

const ResultComponent = ({
  children,
  value = mockDictionaryContext,
}: {
  children: ReactNode;
  value?: DictionaryType;
}) => (
  <BrowserRouter>
    <ThemeProvider>
      <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Test Result component', () => {
  it('Should render Result component', () => {
    const { container } = render(
      <ResultComponent>
        <ResultPage />
      </ResultComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should navigate to vocabulary list when quizzes length less than 0', () => {
    const { container } = render(
      <ResultComponent value={{ ...mockDictionaryContext, quizzes: [] }}>
        <ResultPage />
      </ResultComponent>,
    );

    expect(container).toBeInTheDocument();
  });
});
