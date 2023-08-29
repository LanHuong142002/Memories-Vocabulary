import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

// Contexts
import { ThemeProvider, TopicContext, TopicContextType } from '@contexts';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Components
import { Home } from '@pages';

jest.useFakeTimers();
const mockTopicContext = {
  isLoadingTopic: false,
  errorsTopic: '',
  topics: MOCK_TOPICS,
  quizzes: [],
  onAddTopic: jest.fn(),
  onGetTopics: jest.fn(),
};

const HomePageComponent = ({
  children,
  value = mockTopicContext,
}: {
  children: ReactNode;
  value?: TopicContextType;
}) => (
  <BrowserRouter>
    <ThemeProvider>
      <TopicContext.Provider value={value}>{children}</TopicContext.Provider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Test Home Page', () => {
  it('Should render Home page', () => {
    const { container } = render(
      <HomePageComponent>
        <Home />
      </HomePageComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    const { getByText } = render(
      <HomePageComponent>
        <Home />
      </HomePageComponent>,
    );
    const buttonAddTopic = getByText('Add Topic');
    fireEvent.click(buttonAddTopic);
    const overlayAddNew = getByText('Add New Topic');

    expect(overlayAddNew).toBeInTheDocument();
  });

  it('Should show loading when isLoadingTopic is true', () => {
    const { container } = render(
      <HomePageComponent value={{ ...mockTopicContext, isLoadingTopic: true }}>
        <Home />
      </HomePageComponent>,
    );
    const topics = container.querySelectorAll('.topic');

    expect(topics.length).toBe(0);
  });

  it('Should Add new topic when enter the new topic', () => {
    const { getByText, getByPlaceholderText } = render(
      <HomePageComponent>
        <Home />
      </HomePageComponent>,
    );

    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    const input = getByPlaceholderText('Topic Name');
    fireEvent.change(input, { target: { value: 'Text' } });
    const button = getByText('Done');
    fireEvent.click(button);
    const titleAddTopic = getByText('Add & Select Topic');

    expect(titleAddTopic).toBeInTheDocument();
  });

  it('Should show error message when enter wrong value with click to Done button', () => {
    const { getByText, getByPlaceholderText } = render(
      <HomePageComponent>
        <Home />
      </HomePageComponent>,
    );

    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    const input = getByPlaceholderText('Topic Name');
    fireEvent.change(input, { target: { value: '' } });
    const button = getByText('Done');
    fireEvent.click(button);
    const error = getByText(MESSAGE_ERRORS.REQUIRED);

    expect(error).toBeInTheDocument();
  });

  it('Should open new topic', () => {
    const { getByText } = render(
      <HomePageComponent>
        <Home />
      </HomePageComponent>,
    );

    const titleHome = getByText('Add & Select Topic');
    const topic = getByText(MOCK_TOPIC.name);
    fireEvent.click(topic);

    expect(titleHome).not.toBeInTheDocument();
  });

  it('render error message when typing number to input', () => {
    const { getByText, getByPlaceholderText } = render(
      <HomePageComponent>
        <Home />
      </HomePageComponent>,
    );
    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    const input = getByPlaceholderText('Topic Name');
    act(() => {
      fireEvent.change(input, { target: { value: '2' } });
      jest.runAllTimers();
    });

    expect(getByText(MESSAGE_ERRORS.ALPHABETS)).toBeInTheDocument();
  });
});
