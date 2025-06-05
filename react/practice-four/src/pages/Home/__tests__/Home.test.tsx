import { act, fireEvent, waitFor } from '@testing-library/react';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Components
import { Home } from '@pages';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Hooks
import * as hooks from '@hooks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));

describe('Test Home Page', () => {
  it('Should render Home page', () => {
    const { container } = renderWithThemeProvider(<Home />);

    expect(container).toBeInTheDocument();
  });

  it('Should render loading after add new topic', () => {
    (jest.spyOn(hooks, 'useMutationPostTopic') as jest.Mock).mockImplementation(() => ({
      isLoading: true,
      mutate: jest.fn(),
    }));
    const { container } = renderWithThemeProvider(<Home />);

    expect(container).toBeInTheDocument();
  });

  it('Should open topic when click to topic', () => {
    (jest.spyOn(hooks, 'useTopics') as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: MOCK_TOPICS,
    }));
    const { getByText } = renderWithThemeProvider(<Home />);

    act(() => {
      const topic = getByText(MOCK_TOPIC.name);
      fireEvent.click(topic);
    });

    waitFor(() => {
      expect(getByText('Make Vocabulary with Translation')).toBeInTheDocument();
    });
  });

  it('Should render input with value entered', async () => {
    (jest.spyOn(hooks, 'useTopics') as jest.Mock).mockImplementation(() => ({
      isLoading: false,
    }));
    const { getByText, getByPlaceholderText } = renderWithThemeProvider(<Home />);

    act(() => {
      // Click button Add Topic
      const topic = getByText('Add Topic');
      fireEvent.click(topic);
    });

    const input = getByPlaceholderText('Topic Name');
    const button = getByText('Done');
    act(() => {
      // Enter invalid value for input
      fireEvent.change(input, { target: { value: '222' } });
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(getByText(MESSAGE_ERRORS.ALPHABETS)).toBeInTheDocument();
    });

    act(() => {
      // Enter valid value for input
      fireEvent.change(input, { target: { value: 'aaa' } });
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(input).toHaveValue('aaa');
    });
  });
});
