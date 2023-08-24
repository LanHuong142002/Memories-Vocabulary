import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Contexts
import { DictionaryContext, DictionaryType, ThemeProvider } from '@contexts';

// Mocks
import { MOCK_TOPICS, MOCK_VOCABULARIES, mockResult, mockTableResult } from '@mocks';

// Components
import { TestingPage } from '@pages';

jest.useFakeTimers();
const mockDictionaryContext = {
  isLoadingTopic: false,
  isLoadingVocabulary: false,
  errorsTopic: '',
  errorsVocabulary: '',
  topics: MOCK_TOPICS,
  vocabularies: MOCK_VOCABULARIES,
  quizzes: mockTableResult,
  onAddTopic: jest.fn(),
  onAddVocabulary: jest.fn(),
  onDeleteVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
};

const TestingComponent = ({
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

describe('Test Testing Page', () => {
  it('Should render Testing page', () => {
    const { container, getByText } = render(
      <TestingComponent>
        <TestingPage />
      </TestingComponent>,
    );

    expect(container).toBeInTheDocument();
    expect(getByText(`1 of ${mockTableResult.length}`)).toBeInTheDocument();
  });

  it('Should render text Submit Answer in button when step equal with totalStep', () => {
    const { getByText } = render(
      <TestingComponent value={{ ...mockDictionaryContext, quizzes: [mockResult] }}>
        <TestingPage />
      </TestingComponent>,
    );

    expect(getByText('Submit Answers')).toBeInTheDocument();
  });

  it('Should render error required when click button Next', () => {
    const { getByRole, getByText } = render(
      <TestingComponent>
        <TestingPage />
      </TestingComponent>,
    );

    const button = getByRole('button', {
      name: /next/i,
    });
    fireEvent.click(button);

    expect(getByText(MESSAGE_ERRORS.REQUIRED)).toBeInTheDocument();
  });

  it('Enter value to input and click button submit', () => {
    const { getByRole, getByText } = render(
      <TestingComponent>
        <TestingPage />
      </TestingComponent>,
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Text' } });
    const button = getByRole('button', {
      name: /next/i,
    });
    fireEvent.submit(button);
    fireEvent.change(input, { target: { value: 'Text' } });
    fireEvent.submit(button);
    fireEvent.change(input, { target: { value: 'Text' } });
    fireEvent.submit(button);

    expect(getByText('Submit Answers')).toBeInTheDocument();
  });

  it('Should render error message when typing number to input', () => {
    const { getByRole, getByText } = render(
      <TestingComponent>
        <TestingPage />
      </TestingComponent>,
    );

    const input = getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '2' } });
      jest.runAllTimers();
    });

    expect(getByText(MESSAGE_ERRORS.ALPHABETS)).toBeInTheDocument();
  });

  it('Should back to Vocabulary list when quizzes not exist', () => {
    const { getByText } = render(
      <TestingComponent value={{ ...mockDictionaryContext, quizzes: [] }}>
        <TestingPage />
      </TestingComponent>,
    );

    expect(getByText('0 of 0')).toBeInTheDocument();
  });

  it('Should show loading when isLoading is true', () => {
    const { container } = render(
      <TestingComponent value={{ ...mockDictionaryContext, isLoading: true }}>
        <TestingPage />
      </TestingComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should navigate to vocabulary page when dont have any vocabularies', () => {
    const { container } = render(
      <TestingComponent value={{ ...mockDictionaryContext, vocabularies: [] }}>
        <TestingPage />
      </TestingComponent>,
    );

    expect(container).toBeInTheDocument();
  });
});
