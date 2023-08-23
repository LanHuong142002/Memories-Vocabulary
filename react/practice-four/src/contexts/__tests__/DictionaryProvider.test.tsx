import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { useContext } from 'react';

/// Contexts
import { DictionaryContext, DictionaryProvider } from '@contexts';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS, MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

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

describe('Test DictionaryProvider', () => {
  afterEach(() => {
    cleanup();
  });

  // Get Topic
  it('Should call function get topics success', () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue(MOCK_TOPICS);

    const MockChildren = () => {
      const { topics, onGetTopic } = useContext(DictionaryContext);
      return <MockSuccessComponent items={topics} onClick={onGetTopic!} />;
    };

    const { getAllByTestId, getByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('button-action');
    act(() => {
      fireEvent.click(button);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_TOPICS.length);
  });

  // Get Vocabularies
  it('Should call function get vocabularies success', () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue(MOCK_VOCABULARIES);

    const MockChildren = () => {
      const { vocabularies, onGetVocabularies } = useContext(DictionaryContext);
      return (
        <MockSuccessComponent items={vocabularies} onClick={() => onGetVocabularies('1', 1)} />
      );
    };

    const { getAllByTestId, getByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { errorsVocabulary, onGetVocabularies } = useContext(DictionaryContext);
      return (
        <MockFailureComponent error={errorsVocabulary} onClick={() => onGetVocabularies('1', 1)} />
      );
    };
    const { getByText, getByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('button-action');
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Add Topic
  it('Should call function add new topic success', () => {
    const mock = jest.spyOn(services, 'postData');
    mock.mockResolvedValue(MOCK_TOPIC);

    const MockChildren = () => {
      const { onAddTopic, topics } = useContext(DictionaryContext);
      return <MockSuccessComponent items={topics} onClick={() => onAddTopic(MOCK_TOPIC)} />;
    };

    const { getByTestId, getAllByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('button-action');
    const topics = getAllByTestId('items');
    act(() => {
      fireEvent.click(button);
    });

    expect(topics.length).toBe(1);
  });

  it('Should call function add new topic failure', async () => {
    const mock = jest.spyOn(services, 'postData');
    mock.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { errorsTopic, onAddTopic } = useContext(DictionaryContext);
      return <MockFailureComponent error={errorsTopic} onClick={() => onAddTopic(MOCK_TOPIC)} />;
    };
    const { getByTestId, getByText } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { errorsVocabulary, onAddVocabulary } = useContext(DictionaryContext);
      return (
        <MockFailureComponent
          error={errorsVocabulary}
          onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
        />
      );
    };
    const { getByTestId, getByText } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { onAddVocabulary, vocabularies } = useContext(DictionaryContext);
      return (
        <MockSuccessComponent
          items={vocabularies}
          onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
        />
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { errorsVocabulary, onDeleteVocabulary } = useContext(DictionaryContext);
      return (
        <MockFailureComponent
          error={errorsVocabulary}
          onClick={() => onDeleteVocabulary('1', '1')}
        />
      );
    };
    const { getByTestId, getByText } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { onDeleteVocabulary, vocabularies } = useContext(DictionaryContext);
      return (
        <MockSuccessComponent items={vocabularies} onClick={() => onDeleteVocabulary('1', '1')} />
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { onRandomQuizzes, onSetQuiz, quizzes } = useContext(DictionaryContext);
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
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
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
      const { onRandomQuizzes, errorsVocabulary } = useContext(DictionaryContext);
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
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const buttonRandom = getByTestId('button-random');
    await act(() => {
      fireEvent.click(buttonRandom);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });
});
