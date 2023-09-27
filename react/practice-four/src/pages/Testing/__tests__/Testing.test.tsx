import { AxiosError } from 'axios';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { UseQueryResult } from '@tanstack/react-query';

// Mocks
import { MOCK_VOCABULARIES } from '@mocks';
import * as hooks from '@hooks';
import * as stores from '@stores';

// Interfaces
import { Vocabulary } from '@interfaces';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { Testing } from '@pages';

jest.useFakeTimers();

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));
jest.mock('@stores', () => ({
  ...jest.requireActual('@stores'),
}));

describe('Test Testing Page', () => {
  it('Should render Testing page and description with total quizzes', () => {
    jest.spyOn(hooks, 'useVocabularies').mockImplementation(
      () =>
        ({
          data: MOCK_VOCABULARIES,
          isSuccess: true,
          isLoading: false,
        } as UseQueryResult<Vocabulary[], AxiosError>),
    );

    const { container, getByText } = renderWithThemeProvider(<Testing />);

    expect(container).toBeInTheDocument();
    expect(getByText(`1 of ${MOCK_VOCABULARIES.length}`)).toBeInTheDocument();
  });

  it('Should render text Submit Answer in button when step equal with totalStep', () => {
    jest.spyOn(hooks, 'useVocabularies').mockImplementation(
      () =>
        ({
          data: MOCK_VOCABULARIES,
          isSuccess: true,
          isLoading: false,
        } as UseQueryResult<Vocabulary[], AxiosError>),
    );
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: MOCK_VOCABULARIES,
      onSetQuizzes: jest.fn(),
    }));

    const { getByText } = renderWithThemeProvider(<Testing />);

    expect(getByText('Submit Answers')).toBeInTheDocument();
  });

  it('Input should have empty value after submitted value', async () => {
    jest.spyOn(hooks, 'useVocabularies').mockImplementation(
      () =>
        ({
          data: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
          isSuccess: true,
          isLoading: false,
        } as UseQueryResult<Vocabulary[], AxiosError>),
    );
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
      onSetQuizzes: jest.fn(),
    }));

    const { getByRole, getByPlaceholderText } = renderWithThemeProvider(<Testing />);
    const input = getByPlaceholderText('Type your answer here');
    const button = getByRole('button', {
      name: /next/i,
    });

    act(() => {
      fireEvent.change(input, { target: { value: 'lorem' } });
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('Input should change value after change value twice', async () => {
    jest.spyOn(hooks, 'useVocabularies').mockImplementation(
      () =>
        ({
          data: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
          isSuccess: true,
          isLoading: false,
        } as UseQueryResult<Vocabulary[], AxiosError>),
    );
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
      onSetQuizzes: jest.fn(),
    }));

    const { getByRole } = renderWithThemeProvider(<Testing />);
    const input = getByRole('textbox');
    const button = getByRole('button', {
      name: /next/i,
    });

    act(() => {
      // Enter value for input
      fireEvent.change(input, { target: { value: 'Text' } });
      // Click button move to next quiz
      fireEvent.submit(button);
      // Enter value for second input
      fireEvent.change(input, { target: { value: 'Text2' } });
      // Click button move to next quiz
      fireEvent.submit(button);
    });

    expect(input).toHaveValue('Text2');
  });
});
