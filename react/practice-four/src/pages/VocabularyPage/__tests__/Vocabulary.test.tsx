import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';
import * as reactRouter from 'react-router-dom';

// Contexts
import { DictionaryContext, DictionaryType, ThemeProvider } from '@contexts';

// Mocks
import { MOCK_TOPICS, MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Components
import { VocabularyPage } from '@pages';

jest.useFakeTimers();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });

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

  it('Should render error message when typing number to input', () => {
    const { getByTestId, getAllByText } = render(
      <VocabularyComponent>
        <VocabularyPage />
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
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });
    const { getByRole } = render(
      <VocabularyComponent>
        <VocabularyPage />
      </VocabularyComponent>,
    );
    const deleteBtn = getByRole('button', { name: 'X' });
    fireEvent.click(deleteBtn);
  });

  it('Should call onDeleteVocabulary with the correct vocabularyId when handleDeleteVocabulary is called', () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '' });

    const { getByRole } = render(
      <VocabularyComponent>
        <VocabularyPage />
      </VocabularyComponent>,
    );
    const deleteBtn = getByRole('button', { name: 'X' });
    fireEvent.click(deleteBtn);
  });

  // it('Should click button next and prev pagination', () => {
  //   jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });

  //   const { getByRole } = render(
  //     <VocabularyComponent>
  //       <VocabularyPage />
  //     </VocabularyComponent>,
  //   );
  //   const buttonNext = getByRole('button', {
  //     name: /»/,
  //   });
  //   const buttonPrev = getByRole('button', {
  //     name: /«/,
  //   });

  //   fireEvent.click(buttonNext);
  //   fireEvent.click(buttonPrev);
  // });

  // it('Should click prev two times and let state return 1', () => {
  //   jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '2' });
  //   const { getByRole } = render(
  //     <VocabularyComponent
  //       value={{
  //         ...mockDictionaryContext,
  //         vocabularies: [],
  //       }}
  //     >
  //       <VocabularyPage />
  //     </VocabularyComponent>,
  //   );
  //   const buttonPrev = getByRole('button', {
  //     name: /«/,
  //   });
  //   const buttonNext = getByRole('button', {
  //     name: /»/,
  //   });

  //   fireEvent.click(buttonNext);
  //   fireEvent.click(buttonPrev);
  //   fireEvent.click(buttonPrev);
  // });

  // it('Should return prev page when pages != 1', () => {
  //   const { getByRole } = render(
  //     <VocabularyComponent
  //       value={{
  //         ...mockDictionaryContext,
  //         vocabularies: [],
  //       }}
  //     >
  //       <VocabularyPage />
  //     </VocabularyComponent>,
  //   );
  //   const buttonPrev = getByRole('button', {
  //     name: /»/,
  //   });

  //   fireEvent.click(buttonPrev);
  // });
});
