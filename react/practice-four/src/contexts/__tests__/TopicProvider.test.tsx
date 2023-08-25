import { useContext } from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react';

// Contexts
import { TopicContext, TopicProvider } from '@contexts';

// Interfaces
import { Topic } from '@interfaces';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Services
import * as services from '@services';

jest.mock('@services', () => ({ __esModule: true, ...jest.requireActual('@services') }));
const MockSuccessComponent = ({ items, onClick }: { items: Topic[]; onClick: () => void }) => (
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

describe('Test TopicProvider', () => {
  afterEach(() => {
    cleanup();
  });

  // Get Topic
  it('Should call function get topics success', () => {
    const mock = jest.spyOn(services, 'getData');
    mock.mockResolvedValue(MOCK_TOPICS);

    const MockChildren = () => {
      const { topics, onGetTopics } = useContext(TopicContext);
      return <MockSuccessComponent items={topics} onClick={onGetTopics} />;
    };

    const { getAllByTestId, getByTestId } = render(
      <TopicProvider>
        <MockChildren />
      </TopicProvider>,
    );
    const button = getByTestId('button-action');
    act(() => {
      fireEvent.click(button);
    });

    expect(getAllByTestId('items').length).toBe(MOCK_TOPICS.length);
  });

  // Add Topic
  it('Should call function add new topic success', () => {
    const mock = jest.spyOn(services, 'postData');
    mock.mockResolvedValue(MOCK_TOPIC);

    const MockChildren = () => {
      const { onAddTopic, topics } = useContext(TopicContext);
      return <MockSuccessComponent items={topics} onClick={() => onAddTopic(MOCK_TOPIC)} />;
    };

    const { getByTestId, getAllByTestId } = render(
      <TopicProvider>
        <MockChildren />
      </TopicProvider>,
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
      const { errorsTopic, onAddTopic } = useContext(TopicContext);
      return <MockFailureComponent error={errorsTopic} onClick={() => onAddTopic(MOCK_TOPIC)} />;
    };
    const { getByTestId, getByText } = render(
      <TopicProvider>
        <MockChildren />
      </TopicProvider>,
    );
    const button = getByTestId('button-action');
    await act(() => {
      fireEvent.click(button);
    });

    expect(getByText('Error')).toBeInTheDocument();
  });
});
