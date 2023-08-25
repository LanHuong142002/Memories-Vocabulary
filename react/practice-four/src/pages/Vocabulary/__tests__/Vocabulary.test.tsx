import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import * as reactRouter from 'react-router-dom';

// Contexts
import { ThemeProvider, VocabularyContext, VocabularyContextType } from '@contexts';

// Mocks
import { MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Components
import { Vocabulary } from '@pages';

jest.useFakeTimers();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const mockVocabularyContext = {
  isLoadingVocabularies: false,
  isLoadingLoadMore: false,
  isLoadingAdd: false,
  isLoadingQuizzes: false,
  errorsVocabulary: '',
  deletingById: {
    id: '',
    isLoadingDelete: false,
  },
  vocabularies: MOCK_VOCABULARIES,
  quizzes: [],
  onDeleteVocabulary: jest.fn(),
  onAddVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
  onLoadMore: jest.fn(),
};

const VocabularyComponent = ({
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

describe('Test Vocabulary Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render Vocabulary page', () => {
    const { container } = render(
      <VocabularyComponent>
        <Vocabulary />
      </VocabularyComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should Add new vocabulary when enter in two input', () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });

    const { getByTestId, getByText } = render(
      <VocabularyComponent>
        <Vocabulary />
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

  it('Should render error message when typing number to input', () => {
    const { getByTestId, getAllByText } = render(
      <VocabularyComponent>
        <Vocabulary />
      </VocabularyComponent>,
    );

    const inputENG = getByTestId('input-english');
    const inputVIE = getByTestId('input-vietnamese');

    act(() => {
      fireEvent.change(inputENG, { target: { value: '2' } });
      fireEvent.change(inputVIE, { target: { value: '2' } });
      jest.runAllTimers();
    });

    expect(getAllByText(MESSAGE_ERRORS.ALPHABETS).length).toBe(2);
  });

  it('Should call onRandomQuizzes when handleStartTest is called', () => {
    const { getByRole } = render(
      <VocabularyComponent
        value={{
          ...mockVocabularyContext,
          vocabularies: [
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
            MOCK_VOCABULARY,
          ],
        }}
      >
        <Vocabulary />
      </VocabularyComponent>,
    );
    const startTestBtn = getByRole('button', { name: 'Start Test' });

    fireEvent.click(startTestBtn);
  });

  it('Should call onDeleteVocabulary with the correct vocabularyId when handleDeleteVocabulary is called', () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });
    const { getByRole } = render(
      <VocabularyComponent>
        <Vocabulary />
      </VocabularyComponent>,
    );
    const deleteBtn = getByRole('button', { name: 'X' });
    fireEvent.click(deleteBtn);
  });

  it('Should call onDeleteVocabulary with the correct vocabularyId when handleDeleteVocabulary is called', () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '' });

    const { getByRole } = render(
      <VocabularyComponent>
        <Vocabulary />
      </VocabularyComponent>,
    );
    const deleteBtn = getByRole('button', { name: 'X' });
    fireEvent.click(deleteBtn);
  });

  it('Should click button load more', () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '5' });

    const { getByRole } = render(
      <BrowserRouter>
        <ThemeProvider>
          <VocabularyContext.Provider
            value={{
              ...mockVocabularyContext,
              vocabularies: [...Array.from({ length: 20 }, () => MOCK_VOCABULARY)],
            }}
          >
            <Vocabulary />
          </VocabularyContext.Provider>
        </ThemeProvider>
      </BrowserRouter>,
    );
    const buttonLoadMore = getByRole('button', {
      name: 'Load More',
    });

    fireEvent.click(buttonLoadMore);
  });
});
