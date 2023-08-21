import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Contexts
import { DictionaryContext, DictionaryType, ThemeProvider } from '@contexts';

// Mocks
import { MOCK_TOPICS, MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Components
import { VocabularyPage } from '@pages';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({
    id: '1',
  })),
}));

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

const VocabularyComponent = ({
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
  it('Should render Vocabulary page', () => {
    const { container } = render(
      <VocabularyComponent>
        <VocabularyPage />
      </VocabularyComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should Add new vocabulary when enter in two input', () => {
    const { getByTestId, getByText } = render(
      <VocabularyComponent>
        <VocabularyPage />
      </VocabularyComponent>,
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
      <VocabularyComponent
        value={{
          ...mockDictionaryContext,
          vocabularies: [
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
          ],
        }}
      >
        <VocabularyPage />
      </VocabularyComponent>,
    );
    const startTestBtn = getByRole('button', { name: 'Start Test' });

    fireEvent.click(startTestBtn);
  });

  it('Should call onDeleteVocabulary with the correct vocabularyId when handleDeleteVocabulary is called', () => {
    const { getByRole } = render(
      <VocabularyComponent>
        <VocabularyPage />
      </VocabularyComponent>,
    );
    const deleteBtn = getByRole('button', { name: 'X' });
    fireEvent.click(deleteBtn);
  });
});
