import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Contexts
import { DictionaryContext, DictionaryType, ThemeProvider } from '@contexts';

// Mocks
import { MOCK_TOPICS, MOCK_VOCABULARIES } from '@mocks';
import { VocabularyPage } from '@pages';

const mockDictionaryContext = {
  isLoadingTopic: false,
  isLoadingVocabulary: false,
  errorsTopic: '',
  errorsVocabulary: '',
  topics: MOCK_TOPICS,
  vocabularies: MOCK_VOCABULARIES,
  quizzes: [],
  onAddTopic: jest.fn(),
  onAddVocabulary: jest.fn(),
  onDeleteVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
};

const HomePageComponent = ({
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

describe('Test Vocabulary Page', () => {
  it('Should render Home page', () => {
    const { container } = render(
      <HomePageComponent>
        <VocabularyPage />
      </HomePageComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should Add new vocabulary when enter in two input', () => {
    const { getByTestId, getByText } = render(
      <HomePageComponent>
        <VocabularyPage />
      </HomePageComponent>,
    );

    const inputENG = getByTestId('input-english');
    const inputVIE = getByTestId('input-vietnamese');
    const buttonStartTest = getByText('Add');
    const eventMock = {
      preventDefault: jest.fn(),
      target: [inputENG, inputVIE],
    };
    fireEvent.change(inputENG, { target: { value: 'Text' } });
    fireEvent.change(inputVIE, { target: { value: 'Text' } });
    fireEvent.submit(buttonStartTest, eventMock);

    expect(inputENG).toHaveValue('');
    expect(inputVIE).toHaveValue('');
  });

  it('Should call onRandomQuizzes when handleStartTest is called', () => {
    const { getByRole } = render(
      <HomePageComponent>
        <VocabularyPage />
      </HomePageComponent>,
    );
    const startTestBtn = getByRole('button', { name: /start test/i });

    fireEvent.click(startTestBtn);
  });

  it('Should call onDeleteVocabulary with the correct vocabularyId when handleDeleteVocabulary is called', () => {
    const { getByRole } = render(
      <HomePageComponent>
        <VocabularyPage />
      </HomePageComponent>,
    );
    const deleteBtn = getByRole('button', { name: 'X' });
    fireEvent.click(deleteBtn);
  });
});
