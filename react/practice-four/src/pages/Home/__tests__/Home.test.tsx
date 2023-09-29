import { act, fireEvent } from '@testing-library/react';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Components
import { Home } from '@pages';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Hooks
import * as hooks from '@hooks';

jest.useFakeTimers();
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
  });
});
