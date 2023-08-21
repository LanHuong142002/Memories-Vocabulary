import { DictionaryContext, DictionaryProvider } from '@contexts';
import { MOCK_TOPIC } from '@mocks';
import { act, fireEvent, render } from '@testing-library/react';
import { useContext } from 'react';
import * as services from '@services';

// const DictionaryContextProp = {
//   isLoadingTopic: false,
//   isLoadingVocabulary: false,
//   errorsTopic: '',
//   errorsVocabulary: '',
//   topics: [],
//   vocabularies: MOCK_VOCABULARIES,
//   quizzes: [],
//   onAddTopic: jest.fn(),
//   onAddVocabulary: jest.fn(),
//   onDeleteVocabulary: jest.fn(),
//   onGetVocabularies: jest.fn(),
//   onRandomQuizzes: jest.fn(),
//   onSetQuiz: jest.fn(),
// };
jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));

describe('DictionaryProvider', () => {
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

  // it('should call function add new topic failure', () => {
  //   const mockPostTopic = jest.spyOn(services, 'postData');
  //   mockPostTopic.mockResolvedValue('Error');

  //   const MockChildren = () => {
  //     const { errorsTopic, onAddTopic } = useContext(DictionaryContext);
  //     return (
  //       <>
  //         <p>{errorsTopic}</p>
  //         <button name='Add New' onClick={() => onAddTopic(MOCK_TOPIC)} data-testid='add-topic' />
  //       </>
  //     );
  //   };
  //   const { getByTestId, getByText } = render(
  //     <DictionaryProvider>
  //       <MockChildren />
  //     </DictionaryProvider>,
  //   );
  //   const button = getByTestId('add-topic');
  //   act(() => {
  //     fireEvent.click(button);
  //   });

  //   expect(getByText('Error')).toBeInTheDocument();
  // });
});
