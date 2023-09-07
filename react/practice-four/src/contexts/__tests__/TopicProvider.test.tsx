import { useContext } from 'react';
import { act, cleanup, fireEvent } from '@testing-library/react';

// Contexts
import { TopicContext } from '@contexts';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS, MockFailureComponent, MockSuccessComponent } from '@mocks';

// Services
import * as services from '@services';

// Helpers
import { customRenderProvider } from '@helpers';

jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));

describe('Test TopicProvider', () => {
  afterEach(() => {
    cleanup();
  });

  // Get Topic
  it('Should return topics when call function get topics success', async () => {
    const mockGetTopics = jest.spyOn(services, 'getData');
    mockGetTopics.mockResolvedValue(MOCK_TOPICS);
    const MockChildren = () => {
      const { topics, onGetTopics } = useContext(TopicContext);
      return <MockSuccessComponent items={topics} onClick={onGetTopics} />;
    };

    const { getAllByTestId, getByTestId } = customRenderProvider(<MockChildren />);
    const button = getByTestId('button-action');
    // Click button to get topics
    await act(() => {
      fireEvent.click(button);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_TOPICS.length);
  });

  it('Should return error message when call function get topics failure', async () => {
    const mockGetTopics = jest.spyOn(services, 'getData');
    mockGetTopics.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { errorsTopic, onGetTopics } = useContext(TopicContext);
      return <MockFailureComponent error={errorsTopic} onClick={onGetTopics} />;
    };

    const { getByTestId, getByText } = customRenderProvider(<MockChildren />);
    const button = getByTestId('button-action');
    // Click button to get topics
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });

  // Add Topic
  it('Should return topic when call function post topic success', async () => {
    const mockPostTopic = jest.spyOn(services, 'postData');
    mockPostTopic.mockResolvedValue(MOCK_TOPIC);
    const MockChildren = () => {
      const { onAddTopic, topics } = useContext(TopicContext);
      return <MockSuccessComponent items={topics} onClick={() => onAddTopic(MOCK_TOPIC)} />;
    };

    const { getByTestId, getAllByTestId } = customRenderProvider(<MockChildren />);
    const button = getByTestId('button-action');
    const topics = getAllByTestId('items');
    // Click button to post topic
    await act(() => {
      fireEvent.click(button);
    });

    expect(topics.length).toBe(1);
  });

  it('Should return error message when call function post topic failure', async () => {
    const mockPostTopic = jest.spyOn(services, 'postData');
    mockPostTopic.mockRejectedValue(new Error('Error'));
    const MockChildren = () => {
      const { errorsTopic, onAddTopic } = useContext(TopicContext);
      return <MockFailureComponent error={errorsTopic} onClick={() => onAddTopic(MOCK_TOPIC)} />;
    };

    const { getByTestId, getByText } = customRenderProvider(<MockChildren />);
    const button = getByTestId('button-action');
    // Click button to post topic
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });
});
