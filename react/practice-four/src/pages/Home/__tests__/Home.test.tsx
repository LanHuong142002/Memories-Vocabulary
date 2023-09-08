import { act, fireEvent } from '@testing-library/react';

// Contexts
import { TopicContext, TopicContextType } from '@contexts';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Components
import { Home } from '@pages';

// Helpers
import { renderWithThemeProvider } from '@helpers';

jest.useFakeTimers();
const mockTopicContext = {
  isLoadingTopic: false,
  errorsTopic: '',
  topics: MOCK_TOPICS,
  quizzes: [],
  onAddTopic: jest.fn(),
  onGetTopics: jest.fn(),
};

const HomePageComponent = ({ value = mockTopicContext }: { value?: TopicContextType }) => (
  <TopicContext.Provider value={value}>
    <Home />
  </TopicContext.Provider>
);

describe('Test Home Page', () => {
  it('Should render Home page', () => {
    const { container } = renderWithThemeProvider(<HomePageComponent />);

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    const { getByText } = renderWithThemeProvider(<HomePageComponent />);

    const buttonAddTopic = getByText('Add Topic');
    // Click button add topic
    fireEvent.click(buttonAddTopic);
    const overlayAddNew = getByText('Add New Topic');

    expect(overlayAddNew).toBeInTheDocument();
  });

  it('Should show loading when isLoadingTopic is true', () => {
    const { container } = renderWithThemeProvider(
      <HomePageComponent value={{ ...mockTopicContext, isLoadingTopic: true }} />,
    );
    const topics = container.querySelectorAll('.topic');

    expect(topics.length).toBe(0);
  });

  it('Should Add new topic when enter the new topic', () => {
    const { getByText, getByPlaceholderText } = renderWithThemeProvider(<HomePageComponent />);

    // Click button Add Topic
    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    // Enter value for input
    const input = getByPlaceholderText('Topic Name');
    fireEvent.change(input, { target: { value: 'Text' } });
    // Click button Done to add new topic
    const button = getByText('Done');
    fireEvent.click(button);
    const titleAddTopic = getByText('Add & Select Topic');

    expect(titleAddTopic).toBeInTheDocument();
  });

  it('Should show error message when enter wrong value with click to Done button', () => {
    const { getByText, getByPlaceholderText } = renderWithThemeProvider(<HomePageComponent />);

    // Click button Add Topic
    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    // Enter value empty for input
    const input = getByPlaceholderText('Topic Name');
    fireEvent.change(input, { target: { value: '' } });
    // Click button Done to add new topic
    const button = getByText('Done');
    fireEvent.click(button);
    const error = getByText(MESSAGE_ERRORS.REQUIRED);

    expect(error).toBeInTheDocument();
  });

  it('Should open topic when click to topic', () => {
    const { getByText } = renderWithThemeProvider(<HomePageComponent />);

    const titleHome = getByText('Add & Select Topic');
    const topic = getByText(MOCK_TOPIC.name);
    fireEvent.click(topic);

    expect(titleHome).toBeInTheDocument();
  });

  it('Should render error message when typing number to input', () => {
    const { getByText, getByPlaceholderText } = renderWithThemeProvider(<HomePageComponent />);

    // Click button Add Topic
    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    const input = getByPlaceholderText('Topic Name');
    // Enter value for input
    act(() => {
      fireEvent.change(input, { target: { value: '2' } });
      jest.runAllTimers();
    });

    expect(getByText(MESSAGE_ERRORS.ALPHABETS)).toBeInTheDocument();
  });
});
