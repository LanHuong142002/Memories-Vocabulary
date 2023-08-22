import { DictionaryContext, DictionaryProvider } from '@contexts';
import { MOCK_TOPIC, MOCK_VOCABULARY } from '@mocks';
import { act, fireEvent, render } from '@testing-library/react';
import { useContext } from 'react';
import * as services from '@services';

jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));

describe('DictionaryProvider', () => {
  // Add Topic
  it('should call function add new topic success', () => {
    const mockPostTopic = jest.spyOn(services, 'postData');
    mockPostTopic.mockResolvedValue(MOCK_TOPIC);

    const MockChildren = () => {
      const { onAddTopic, topics } = useContext(DictionaryContext);

      return (
        <div>
          <div data-testid='topics'>
            {topics.map((item, index) => (
              <p key={`topic-${index}`}>{item.name}</p>
            ))}
          </div>
          <button name='Add New' onClick={() => onAddTopic(MOCK_TOPIC)} data-testid='add-topic' />
        </div>
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('add-topic');
    const topics = getAllByTestId('topics');
    act(() => {
      fireEvent.click(button);
    });

    expect(topics.length).toBe(1);
  });

  it('should call function add new topic failure', async () => {
    const mockPostTopic = jest.spyOn(services, 'postData');
    mockPostTopic.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { errorsTopic, onAddTopic } = useContext(DictionaryContext);
      return (
        <>
          <p>{errorsTopic}</p>
          <button name='Add New' onClick={() => onAddTopic(MOCK_TOPIC)} data-testid='add-topic' />
        </>
      );
    };
    const { getByTestId, getByText } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('add-topic');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Add vocabulary
  it('should call function add new vocabulary failure', async () => {
    const mockPostVocabulary = jest.spyOn(services, 'postData');
    mockPostVocabulary.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { errorsVocabulary, onAddVocabulary } = useContext(DictionaryContext);
      return (
        <>
          <p>{errorsVocabulary}</p>
          <button
            name='Add New'
            onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
            data-testid='add-vocabulary'
          />
        </>
      );
    };
    const { getByTestId, getByText } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('add-vocabulary');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  it('should call function add new vocabulary success', () => {
    const mockPostVocabulary = jest.spyOn(services, 'postData');
    mockPostVocabulary.mockResolvedValue(MOCK_VOCABULARY);

    const MockChildren = () => {
      const { onAddVocabulary, vocabularies } = useContext(DictionaryContext);

      return (
        <div>
          <div data-testid='vocabularies'>
            {vocabularies.map((item, index) => (
              <p key={`vocabulary-${index}`}>{item.english}</p>
            ))}
          </div>
          <button
            name='Add New'
            onClick={() => onAddVocabulary('1', MOCK_VOCABULARY)}
            data-testid='add-vocabulary'
          />
        </div>
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('add-vocabulary');
    const vocabularies = getAllByTestId('vocabularies');
    act(() => {
      fireEvent.click(button);
    });

    expect(vocabularies.length).toBe(1);
  });

  // Delete vocabulary
  it('should call function delete vocabulary failure', async () => {
    const mockPostVocabulary = jest.spyOn(services, 'deleteData');
    mockPostVocabulary.mockRejectedValue(new Error('Error'));

    const MockChildren = () => {
      const { errorsVocabulary, onDeleteVocabulary } = useContext(DictionaryContext);
      return (
        <>
          <p>{errorsVocabulary}</p>
          <button
            name='Delete Vocabulary'
            onClick={() => onDeleteVocabulary('1', '1')}
            data-testid='delete-vocabulary'
          />
        </>
      );
    };
    const { getByTestId, getByText } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('delete-vocabulary');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  it('should call function delete vocabulary success', () => {
    const mockPostVocabulary = jest.spyOn(services, 'deleteData');
    mockPostVocabulary.mockResolvedValue(MOCK_VOCABULARY);

    const MockChildren = () => {
      const { onDeleteVocabulary, vocabularies } = useContext(DictionaryContext);

      return (
        <div>
          <div data-testid='vocabularies'>
            {vocabularies.map((item, index) => (
              <p key={`vocabulary-${index}`}>{item.english}</p>
            ))}
          </div>
          <button
            name='Delete vocabulary'
            onClick={() => onDeleteVocabulary('1', '1')}
            data-testid='delete-vocabulary'
          />
        </div>
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <DictionaryProvider>
        <MockChildren />
      </DictionaryProvider>,
    );
    const button = getByTestId('delete-vocabulary');
    const vocabularies = getAllByTestId('vocabularies');
    act(() => {
      fireEvent.click(button);
    });

    expect(vocabularies.length).toBe(1);
  });
});
