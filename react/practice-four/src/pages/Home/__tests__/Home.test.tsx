import { fireEvent } from '@testing-library/react';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Components
import { Home } from '@pages';

// Helpers
import { renderWithThemeProvider } from '@helpers';

jest.useFakeTimers();
jest.mock('@hooks', () => {
  const originalModule = jest.requireActual('@hooks');
  return {
    ...originalModule,
    useTopics: jest.fn().mockImplementation(() => ({
      isLoading: false,
      data: MOCK_TOPICS,
    })),
    useMutationPostTopic: jest.fn().mockImplementation(() => ({
      mutate: jest.fn(),
      isLoading: true,
    })),
  };
});

describe('Test Home Page', () => {
  it('Should render Home page', () => {
    const { container } = renderWithThemeProvider(<Home />);

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    const { getByText } = renderWithThemeProvider(<Home />);

    const buttonAddTopic = getByText('Add Topic');
    // Click button add topic
    fireEvent.click(buttonAddTopic);
    const overlayAddNew = getByText('Add New Topic');

    expect(overlayAddNew).toBeInTheDocument();
  });

  it('Should open topic when click to topic', () => {
    const { getByText } = renderWithThemeProvider(<Home />);

    const titleHome = getByText('Add & Select Topic');
    const topic = getByText(MOCK_TOPIC.name);
    fireEvent.click(topic);

    expect(titleHome).toBeInTheDocument();
  });

  it('Should render input with value entered', () => {
    const { getByText, getByPlaceholderText } = renderWithThemeProvider(<Home />);

    // Click button Add Topic
    const topic = getByText('Add Topic');
    fireEvent.click(topic);
    const input = getByPlaceholderText('Topic Name');
    const button = getByText('Done');

    // Enter invalid value for input
    fireEvent.change(input, { target: { value: '222' } });

    // Enter valid value for input
    fireEvent.change(input, { target: { value: 'aaa' } });
    fireEvent.submit(button);

    expect(input).toHaveValue('aaa');
  });
});
