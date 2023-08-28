import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { useContext } from 'react';

/// Contexts
import { VocabularyContext, VocabularyProvider } from '@contexts';

// Mocks
import { MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Services
import * as services from '@services';

// Interfaces
import { Topic, Vocabulary } from '@interfaces';

jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));

const MockSuccessComponent = ({
  items,
  onClick,
}: {
  items: Vocabulary[] | Topic[];
  onClick: () => void;
}) => (
  <div>
    <div data-testid='items'>
      {items.map((item, index) => (
        <p key={`item-${index}`}>{item.id}</p>
      ))}
    </div>
    <button name='Submit' onClick={onClick} data-testid='button-action' />
  </div>
);

const MockFailureComponent = ({ error, onClick }: { error: string; onClick: () => void }) => (
  <div>
    <p>{error}</p>
    <button name='Submit' onClick={onClick} data-testid='button-action' />
  </div>
);

describe('Test VocabularyProvider', () => {
  afterEach(() => {
    cleanup();
  });

  // Get Vocabularies
  it('Should call function get vocabularies success', () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue(MOCK_VOCABULARIES);

    const MockChildren = () => {
      const { vocabularies, onGetVocabularies } = useContext(VocabularyContext);
      return <MockSuccessComponent items={vocabularies} onClick={() => onGetVocabularies('1')} />;
    };

    const { getAllByTestId, getByTestId } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('button-action');

    act(() => {
      fireEvent.click(button);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_VOCABULARIES.length);
  });

  it('Should call function get vocabularies failure', async () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { errorsVocabulary, onGetVocabularies } = useContext(VocabularyContext);
      return (
        <MockFailureComponent error={errorsVocabulary} onClick={() => onGetVocabularies('1')} />
      );
    };
    const { getByText, getByTestId } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('button-action');
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Add vocabulary
  it('Should call function add new vocabulary failure', async () => {
    const mock = jest.spyOn(services, 'postData');
    mock.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { errorsVocabulary, onAddVocabulary } = useContext(VocabularyContext);
      return (
        <MockFailureComponent
          error={errorsVocabulary}
          onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
        />
      );
    };
    const { getByTestId, getByText } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('button-action');
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  it('Should call function add new vocabulary success', () => {
    const mock = jest.spyOn(services, 'postData');
    mock.mockResolvedValue(MOCK_VOCABULARY);

    const MockChildren = () => {
      const { onAddVocabulary, vocabularies } = useContext(VocabularyContext);
      return (
        <MockSuccessComponent
          items={vocabularies}
          onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
        />
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('button-action');
    const vocabularies = getAllByTestId('items');
    act(() => {
      fireEvent.click(button);
    });

    expect(vocabularies.length).toBe(1);
  });

  // Delete vocabulary
  it('Should call function delete vocabulary failure', async () => {
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
    const { getByTestId, getByText } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('button-action');

    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  it('Should call function delete vocabulary success', () => {
    const mock = jest.spyOn(services, 'deleteData');
    mock.mockResolvedValue(MOCK_VOCABULARY);

    const MockChildren = () => {
      const { onDeleteVocabulary, vocabularies } = useContext(VocabularyContext);
      return (
        <MockSuccessComponent items={vocabularies} onClick={() => onDeleteVocabulary('1', '1')} />
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('button-action');
    const vocabularies = getAllByTestId('items');
    act(() => {
      fireEvent.click(button);
    });

    expect(vocabularies.length).toBe(1);
  });

  // Random quizzes
  it('Should call random quiz success and set quiz when click the button', () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue(MOCK_VOCABULARIES);

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

    const { getByTestId, getAllByTestId } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const buttonRandom = getByTestId('button-random');
    const buttonSetQuiz = getByTestId('button-set-quiz');
    act(() => {
      fireEvent.click(buttonRandom);
      fireEvent.click(buttonSetQuiz);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_VOCABULARIES.length);
  });

  it('Should call function delete vocabulary failure', async () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockRejectedValue(new Error('Error'));

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

    const { getByTestId, getByText } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const buttonRandom = getByTestId('button-random');
    await act(() => {
      fireEvent.click(buttonRandom);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Load More
  it('Should call random quiz success and set quiz when click the button', () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue(MOCK_VOCABULARIES);

    const MockChildren = () => {
      const { onLoadMore } = useContext(VocabularyContext);
      return (
        <button onClick={() => onLoadMore!('1', 1)} data-testid='load-more'>
          Load More
        </button>
      );
    };

    const { getByTestId } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const button = getByTestId('load-more');
    act(() => {
      fireEvent.click(button);
    });
  });

  it('Should call function delete vocabulary failure', async () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockRejectedValue(new Error('Error'));

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

    const { getByTestId, getByText } = render(
      <VocabularyProvider>
        <MockChildren />
      </VocabularyProvider>,
    );
    const buttonRandom = getByTestId('load-more');
    await act(() => {
      fireEvent.click(buttonRandom);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });
});
