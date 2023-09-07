import { fireEvent, act } from '@testing-library/react';
import * as reactRouter from 'react-router-dom';

// Contexts
import { VocabularyContext, VocabularyContextType } from '@contexts';

// Mocks
import { MOCK_VOCABULARY, MOCK_VOCABULARY_CONTEXT_VALUE } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Helpers
import { customRender } from '@helpers';

// Components
import { Vocabulary } from '@pages';

jest.useFakeTimers();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const mockVocabularyContext = {
  ...MOCK_VOCABULARY_CONTEXT_VALUE,
  onCheckEnglishIsExisted: jest.fn().mockResolvedValue(false),
};

const VocabularyComponent = ({
  value = mockVocabularyContext,
}: {
  value?: VocabularyContextType;
}) => (
  <VocabularyContext.Provider value={value}>
    <Vocabulary />
  </VocabularyContext.Provider>
);

describe('Test Vocabulary Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render Vocabulary page', () => {
    const { container } = customRender(<VocabularyComponent />);

    expect(container).toBeInTheDocument();
  });

  it('Should Add new vocabulary when enter in two input', async () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });
    const { getByTestId, getByText } = customRender(<VocabularyComponent />);

    const inputENG = getByTestId('input-english');
    const inputVIE = getByTestId('input-vietnamese');
    const buttonStartTest = getByText('Add');
    const eventMock = {
      preventDefault: jest.fn(),
      target: [inputENG, inputVIE],
    };

    await act(() => {
      // Enter value for two inputs ENG and VIE
      fireEvent.change(inputENG, { target: { value: 'Text' } });
      fireEvent.change(inputVIE, { target: { value: 'Text' } });
      // Click button submit
      fireEvent.submit(buttonStartTest, eventMock);
    });

    expect(inputENG).toHaveValue('');
    expect(inputVIE).toHaveValue('');
  });

  it('Should render error message when typing number to input', async () => {
    const { getByTestId, getAllByText } = customRender(<VocabularyComponent />);

    const inputENG = getByTestId('input-english');
    const inputVIE = getByTestId('input-vietnamese');

    await act(() => {
      // Enter value number for two inputs ENG and VIE
      fireEvent.change(inputENG, { target: { value: '2' } });
      fireEvent.change(inputVIE, { target: { value: '2' } });
      jest.runAllTimers();
    });

    expect(getAllByText(MESSAGE_ERRORS.ALPHABETS).length).toBe(2);
  });

  it('Should call onRandomQuizzes when handleStartTest is called', () => {
    const { getByRole } = customRender(
      <VocabularyComponent
        value={{
          ...mockVocabularyContext,
          vocabularies: [
            ...Array.from({ length: 5 }, (_, index) => ({
              ...MOCK_VOCABULARY,
              id: `id_${index + 1}`,
            })),
          ],
        }}
      />,
    );
    const startTestBtn = getByRole('button', { name: 'Start Test' });

    fireEvent.click(startTestBtn);
  });

  it('Should click button load more', async () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '5' });

    const { getByRole } = customRender(
      <VocabularyComponent
        value={{
          ...mockVocabularyContext,
          vocabularies: [
            ...Array.from({ length: 20 }, (_, index) => ({
              ...MOCK_VOCABULARY,
              id: `id_${index + 1}`,
            })),
          ],
          onLoadMore: jest.fn().mockResolvedValue(2),
        }}
      />,
    );
    const buttonLoadMore = getByRole('button', {
      name: 'Load More',
    });
    await act(() => {
      fireEvent.click(buttonLoadMore);
    });
  });

  it('Should show confirm modal and click button Delete', () => {
    const { getByTestId, getByText } = customRender(<VocabularyComponent />);

    // Click button X in row and show confirm modal
    const buttonShowConfirmModal = getByTestId('button-delete-vocabulary');
    fireEvent.click(buttonShowConfirmModal);

    // Click button delete confirm delete
    const buttonDelete = getByText('Delete');
    fireEvent.click(buttonDelete);
  });
});
