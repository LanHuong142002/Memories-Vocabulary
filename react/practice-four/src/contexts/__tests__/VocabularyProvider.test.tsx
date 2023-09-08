import { act, cleanup, fireEvent } from '@testing-library/react';
import { useContext } from 'react';

/// Contexts
import { VocabularyContext } from '@contexts';

// Mocks
import {
  MOCK_VOCABULARIES,
  MOCK_VOCABULARY,
  MockFailureComponent,
  MockSuccessComponent,
} from '@mocks';

// Services
import * as services from '@services';

// Helpers
import { renderWithProvider } from '@helpers';

jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));

describe('Test VocabularyProvider', () => {
  afterEach(() => {
    cleanup();
  });

  // Get Vocabularies
  it('Should return vocabularies when call function get vocabularies success', async () => {
    const mockGetVocabularies = jest.spyOn(services, 'getData');
    mockGetVocabularies.mockResolvedValue(MOCK_VOCABULARIES);
    const MockChildren = () => {
      const { vocabularies, onGetVocabularies } = useContext(VocabularyContext);
      return <MockSuccessComponent items={vocabularies} onClick={() => onGetVocabularies('1')} />;
    };

    const { getAllByTestId, getByTestId } = renderWithProvider(<MockChildren />);
    const button = getByTestId('button-action');
    // Click button to get vocabularies
    await act(() => {
      fireEvent.click(button);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_VOCABULARIES.length);
  });

  it('Should return error message when call function get vocabularies failure', async () => {
    const mockGetVocabularies = jest.spyOn(services, 'getData');
    mockGetVocabularies.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { errorsVocabulary, onGetVocabularies } = useContext(VocabularyContext);
      return (
        <MockFailureComponent error={errorsVocabulary} onClick={() => onGetVocabularies('1')} />
      );
    };

    const { getByText, getByTestId } = renderWithProvider(<MockChildren />);
    const button = getByTestId('button-action');
    // Click button to get vocabularies
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Add vocabulary
  it('Should return error message when call function post vocabulary failure', async () => {
    const mockPostVocabulary = jest.spyOn(services, 'postData');
    mockPostVocabulary.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { errorsVocabulary, onAddVocabulary } = useContext(VocabularyContext);
      return (
        <MockFailureComponent
          error={errorsVocabulary}
          onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
        />
      );
    };

    const { getByTestId, getByText } = renderWithProvider(<MockChildren />);
    const button = getByTestId('button-action');
    // Click button to post vocabulary
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  it('Should return vocabularies when call function post vocabulary success', async () => {
    const mockPostVocabulary = jest.spyOn(services, 'postData');
    mockPostVocabulary.mockResolvedValue(MOCK_VOCABULARY);
    const MockChildren = () => {
      const { onAddVocabulary, vocabularies } = useContext(VocabularyContext);
      return (
        <MockSuccessComponent
          items={vocabularies}
          onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
        />
      );
    };

    const { getByTestId, getAllByTestId } = renderWithProvider(<MockChildren />);
    const button = getByTestId('button-action');
    const vocabularies = getAllByTestId('items');
    // Click button to post vocabulary
    await act(() => {
      fireEvent.click(button);
    });

    expect(vocabularies.length).toBe(1);
  });

  // Delete vocabulary
  it('Should return error message when call function delete vocabulary failure', async () => {
    const mock = jest.spyOn(services, 'deleteData');
    mock.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { errorsVocabulary, onDeleteVocabulary } = useContext(VocabularyContext);
      return (
        <MockFailureComponent
          error={errorsVocabulary}
          onClick={() => onDeleteVocabulary('1', '1')}
        />
      );
    };
    // Click button to delete vocabulary
    const { getByTestId, getByText } = renderWithProvider(<MockChildren />);
    const button = getByTestId('button-action');

    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  it('Should return vocabulary when call function delete vocabulary success', async () => {
    const mock = jest.spyOn(services, 'deleteData');
    mock.mockResolvedValue(MOCK_VOCABULARY);
    const MockChildren = () => {
      const { onDeleteVocabulary, vocabularies } = useContext(VocabularyContext);
      return (
        <MockSuccessComponent items={vocabularies} onClick={() => onDeleteVocabulary('1', '1')} />
      );
    };

    const { getByTestId, getAllByTestId } = renderWithProvider(<MockChildren />);
    const button = getByTestId('button-action');
    const vocabularies = getAllByTestId('items');
    // Click button to delete vocabulary
    await act(() => {
      fireEvent.click(button);
    });

    expect(vocabularies.length).toBe(1);
  });

  // Random quizzes
  it('Should return quizzes when function random quiz success and set quiz when click the button', async () => {
    const mockGetRandomQuizzes = jest.spyOn(services, 'getData');
    mockGetRandomQuizzes.mockResolvedValue(MOCK_VOCABULARIES);
    const MockChildren = () => {
      const { onRandomQuizzes, onSetQuiz, quizzes } = useContext(VocabularyContext);
      return (
        <>
          {quizzes.map((item, index) => (
            <p key={index} data-testid='items'>
              {item.answer}
            </p>
          ))}
          <button onClick={() => onRandomQuizzes('1')} data-testid='button-random'>
            Random
          </button>
          <button onClick={() => onSetQuiz(MOCK_VOCABULARIES)} data-testid='button-set-quiz'>
            Set Quiz
          </button>
        </>
      );
    };

    const { getByTestId, getAllByTestId } = renderWithProvider(<MockChildren />);
    const buttonRandom = getByTestId('button-random');
    const buttonSetQuiz = getByTestId('button-set-quiz');
    // Click button random quizzes and set quiz
    await act(() => {
      fireEvent.click(buttonRandom);
      fireEvent.click(buttonSetQuiz);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_VOCABULARIES.length);
  });

  it('Should return error message when call function get random quizzes failure', async () => {
    const mockGetRandomQuizzes = jest.spyOn(services, 'getData');
    mockGetRandomQuizzes.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { onRandomQuizzes, errorsVocabulary } = useContext(VocabularyContext);
      return (
        <>
          <p>{errorsVocabulary}</p>
          <button onClick={() => onRandomQuizzes('1')} data-testid='button-random'>
            Random
          </button>
        </>
      );
    };

    const { getByTestId, getByText } = renderWithProvider(<MockChildren />);
    const buttonRandom = getByTestId('button-random');
    // Click button random quizzes
    await act(() => {
      fireEvent.click(buttonRandom);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Load More
  it('Should call load more success', async () => {
    const mockGetMoreVocabularies = jest.spyOn(services, 'getData');
    mockGetMoreVocabularies.mockResolvedValue(MOCK_VOCABULARIES);
    const MockChildren = () => {
      const { onLoadMore } = useContext(VocabularyContext);
      return (
        <button onClick={() => onLoadMore!('1', 1)} data-testid='load-more'>
          Load More
        </button>
      );
    };

    const { getByTestId } = renderWithProvider(<MockChildren />);
    const button = getByTestId('load-more');
    // Click button load more
    await act(() => {
      fireEvent.click(button);
    });
  });

  it('Should return error message when call function load more failure', async () => {
    const mockGetMoreVocabularies = jest.spyOn(services, 'getData');
    mockGetMoreVocabularies.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { onLoadMore, errorsVocabulary } = useContext(VocabularyContext);
      return (
        <>
          <p>{errorsVocabulary}</p>
          <button onClick={() => onLoadMore!('1', 1)} data-testid='load-more'>
            Load More
          </button>
        </>
      );
    };

    const { getByTestId, getByText } = renderWithProvider(<MockChildren />);
    const buttonRandom = getByTestId('load-more');
    // Click button load more
    await act(() => {
      fireEvent.click(buttonRandom);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Handle Check English Is Existed
  it('Should call function onCheckEnglishIsExisted success', async () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue([MOCK_VOCABULARY]);
    const MockChildren = () => {
      const { onCheckEnglishIsExisted } = useContext(VocabularyContext);
      return (
        <button
          onClick={() => onCheckEnglishIsExisted!('1', MOCK_VOCABULARY.english)}
          data-testid='check'
        >
          Check
        </button>
      );
    };

    const { getByTestId } = renderWithProvider(<MockChildren />);
    const button = getByTestId('check');
    // Click button to check vocabulary existed or not
    await act(() => {
      fireEvent.click(button);
    });
  });

  it('Should return error message when call onCheckEnglishIsExisted failure', async () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { onCheckEnglishIsExisted, errorsVocabulary } = useContext(VocabularyContext);
      return (
        <>
          <p>{errorsVocabulary}</p>
          <button
            onClick={() => onCheckEnglishIsExisted!('1', MOCK_VOCABULARY.english)}
            data-testid='check'
          >
            Check
          </button>
        </>
      );
    };

    const { getByTestId, getByText } = renderWithProvider(<MockChildren />);
    const buttonRandom = getByTestId('check');
    await act(() => {
      fireEvent.click(buttonRandom);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });
});
