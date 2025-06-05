import * as hooks from '@hooks';
import * as reactRouter from 'react-router-dom';
import { act, fireEvent, waitFor } from '@testing-library/react';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Mocks
import { MOCK_VOCABULARIES, MOCK_VOCABULARY } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Components
import { Vocabulary } from '@pages';

jest.useFakeTimers();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));
jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));

describe('Test Vocabulary Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render Vocabulary page', () => {
    const { container } = renderWithThemeProvider(<Vocabulary />);

    expect(container).toBeInTheDocument();
  });

  it('Should clear input after click button Add', async () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      refetch: jest.fn().mockResolvedValue({
        data: jest.fn().mockReturnValue([]),
      }),
    }));

    const { getByTestId, getByText } = renderWithThemeProvider(<Vocabulary />);
    const inputENG = getByTestId('input-english');
    const inputVIE = getByTestId('input-vietnamese');
    const buttonAdd = getByText('Add');

    await act(() => {
      // Enter value for two inputs ENG and VIE
      fireEvent.change(inputENG, { target: { value: 'Text' } });
      fireEvent.change(inputVIE, { target: { value: 'Text' } });
    });
    await act(() => {
      // Click button submit
      fireEvent.submit(buttonAdd);
    });

    await waitFor(() => {
      expect(inputENG).toHaveValue('');
      expect(inputVIE).toHaveValue('');
    });
  });

  it('Should show error if response has data after click button Add', async () => {
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      refetch: jest.fn().mockResolvedValue(MOCK_VOCABULARIES),
    }));

    const { getByTestId, getByText } = renderWithThemeProvider(<Vocabulary />);
    const inputENG = getByTestId('input-english');
    const inputVIE = getByTestId('input-vietnamese');
    const buttonAdd = getByText('Add');

    await act(() => {
      // Enter value for two inputs ENG and VIE
      fireEvent.change(inputENG, { target: { value: 'Text' } });
      fireEvent.change(inputVIE, { target: { value: 'Text' } });
    });
    await act(() => {
      // Click button submit
      fireEvent.submit(buttonAdd);
    });

    await waitFor(() => {
      expect(getByText(MESSAGE_ERRORS.EXISTED)).toBeInTheDocument();
    });
  });

  it('Should navigate to testing when click button Start Test', () => {
    const vocabularies = [
      ...Array.from({ length: 20 }, (_, index) => ({
        ...MOCK_VOCABULARY,
        id: `id_${index + 1}`,
      })),
      MOCK_VOCABULARIES,
    ];
    jest.spyOn(reactRouter, 'useParams').mockReturnValue({ id: '1' });
    (jest.spyOn(hooks, 'useInfiniteVocabularies') as jest.Mock).mockImplementation(() => ({
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isLoading: false,
      data: {
        pages: [vocabularies],
      },
    }));
    const { getByRole } = renderWithThemeProvider(<Vocabulary />);
    const startTestBtn = getByRole('button', { name: 'Start Test' });

    act(() => {
      fireEvent.click(startTestBtn);
    });
  });
});
