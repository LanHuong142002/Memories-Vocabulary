import { fireEvent } from '@testing-library/react';

// Mocks
import { MOCK_TOPIC, MOCK_TOPICS } from '@mocks';

// Components
import { Home } from '@pages';

// Helpers
import { renderWithThemeProvider } from '@helpers';
import * as hooks from '@hooks';
import { AxiosError } from 'axios';
import { Topic } from '@interfaces';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

jest.useFakeTimers();
jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));

describe('Test Home Page', () => {
  it('Should render Home page', () => {
    const { container } = renderWithThemeProvider(<Home />);

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    jest
      .spyOn(hooks, 'useTopics')
      .mockImplementation(() => ({ isLoading: false } as UseQueryResult<Topic[], AxiosError>));
    const { getByText } = renderWithThemeProvider(<Home />);

    const buttonAddTopic = getByText('Add Topic');
    // Click button add topic
    fireEvent.click(buttonAddTopic);
    const overlayAddNew = getByText('Add New Topic');

    expect(overlayAddNew).toBeInTheDocument();
  });

  it('Should show loading when isLoadingTopic is true', () => {
    jest
      .spyOn(hooks, 'useTopics')
      .mockImplementation(
        () => ({ isLoading: false, data: MOCK_TOPICS } as UseQueryResult<Topic[], AxiosError>),
      );
    const { container } = renderWithThemeProvider(<Home />);
    const topics = container.querySelectorAll('.topic');

    expect(topics.length).toBe(2);
  });

  // it('Should Add new topic when enter the new topic', () => {
  //   jest
  //     .spyOn(hooks, 'useTopics')
  //     .mockImplementation(
  //       () => ({ isLoading: false, data: MOCK_TOPICS } as UseQueryResult<Topic[], AxiosError>),
  //     );
  //   const { getByText, getByPlaceholderText } = renderWithThemeProvider(<Home />);

  //   act(() => {
  //     // Click button Add Topic
  //     const topic = getByText('Add Topic');
  //     fireEvent.click(topic);

  //     // Enter value for input
  //     const input = getByPlaceholderText('Topic Name');
  //     fireEvent.change(input, { target: { value: 'Text' } });
  //     // Click button Done to add new topic
  //     const button = getByText('Done');
  //     fireEvent.click(button);
  //   });

  //   const titleAddTopic = getByText('Add & Select Topic');
  //   expect(titleAddTopic).toBeInTheDocument();
  // });

  // it('Should show error message when enter wrong value with click to Done button', () => {
  //   jest
  //     .spyOn(hooks, 'useTopics')
  //     .mockImplementation(
  //       () => ({ isLoading: false, data: MOCK_TOPICS } as UseQueryResult<Topic[], AxiosError>),
  //     );
  //   const { getByText } = renderWithThemeProvider(<Home />);

  //   act(() => {
  //     // Click button Add Topic
  //     const topic = getByText('Add Topic');
  //     fireEvent.click(topic);
  //     // fireEvent.click(topic);

  //     // // Enter value empty for input
  //     // const input = getByPlaceholderText('Topic Name');
  //     // fireEvent.change(input, { target: { value: '' } });

  //     // // Click button Done to add new topic
  //     // const button = getByText('Done');
  //     // fireEvent.click(button);
  //   });

  //   // const error = getByText(MESSAGE_ERRORS.REQUIRED);
  //   // expect(error).toBeInTheDocument();
  // });

  it('Should open topic when click to topic', () => {
    const { getByText } = renderWithThemeProvider(<Home />);

    const titleHome = getByText('Add & Select Topic');
    const topic = getByText(MOCK_TOPIC.name);
    fireEvent.click(topic);

    expect(titleHome).toBeInTheDocument();
  });

  it('Should render error message when typing number to input', () => {
    jest
      .spyOn(hooks, 'useTopics')
      .mockImplementation(
        () => ({ isLoading: false, data: MOCK_TOPICS } as UseQueryResult<Topic[], AxiosError>),
      );
    jest
      .spyOn(hooks, 'useMutationPostTopic')
      .mockImplementation(
        () =>
          ({ mutate: jest.fn(), isLoading: true } as unknown as UseMutationResult<
            Omit<Topic, 'id'>,
            AxiosError<unknown, unknown>,
            Omit<Topic, 'id'>,
            unknown
          >),
      );
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
  });
});
