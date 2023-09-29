import { act, fireEvent, waitFor } from '@testing-library/react';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Mocks
import { MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Components
import FormTesting from '../FormTesting';

// Stores
import * as stores from '@stores';

// Hooks
import * as hooks from '@hooks';
import * as reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));
jest.mock('@stores', () => ({
  ...jest.requireActual('@stores'),
}));
jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));

describe('Test FormTesting', () => {
  const defaultProps = {
    id: '1',
    vocabulariesAll: MOCK_VOCABULARIES,
  };

  it('Should render FormTesting', () => {
    const { container } = renderWithThemeProvider(<FormTesting {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render FormTesting with default value', () => {
    jest.spyOn(reactRouterDom, 'useNavigate').mockImplementation(() => jest.fn());
    const { container } = renderWithThemeProvider(<FormTesting />);

    expect(container).toBeInTheDocument();
  });

  it('Should render text Submit Answer in button when step equal with totalStep', () => {
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      data: MOCK_VOCABULARIES,
      isSuccess: true,
      isLoading: false,
    }));
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: MOCK_VOCABULARIES,
      setQuizzes: jest.fn(),
    }));

    const { getByText } = renderWithThemeProvider(<FormTesting {...defaultProps} />);

    expect(getByText('Submit Answers')).toBeInTheDocument();
  });

  it('Input should have empty value after submitted value', async () => {
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      data: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
      isSuccess: true,
      isLoading: false,
    }));
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
      setQuizzes: jest.fn(),
    }));

    const { getByRole, getByPlaceholderText } = renderWithThemeProvider(
      <FormTesting {...defaultProps} />,
    );
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
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      data: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
      isSuccess: true,
      isLoading: false,
    }));
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: [...MOCK_VOCABULARIES, ...MOCK_VOCABULARIES],
      setQuizzes: jest.fn(),
    }));

    const { getByRole } = renderWithThemeProvider(
      <FormTesting
        {...defaultProps}
        vocabulariesAll={[...MOCK_VOCABULARIES, { ...MOCK_VOCABULARY, id: '10' }]}
      />,
    );
    const input = getByRole('textbox');
    const button = getByRole('button', {
      name: /next/i,
    });

    await act(() => {
      // Enter value for input
      fireEvent.change(input, { target: { value: 'Text' } });
      // Click button move to next quiz
      fireEvent.submit(button);

      // Enter value for second input
      fireEvent.change(input, { target: { value: 'Text2' } });
      // Click button move to next quiz
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(input).toHaveValue('Text2');
    });
  });
});
