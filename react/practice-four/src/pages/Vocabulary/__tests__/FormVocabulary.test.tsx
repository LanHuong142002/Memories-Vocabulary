import { act, fireEvent, waitFor } from '@testing-library/react';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Hooks
import * as hooks from '@hooks';

// Mocks
import { MOCK_VOCABULARIES } from '@mocks';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Components
import FormVocabulary from '../FormVocabulary';

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));

describe('Test FormVocabulary', () => {
  const handleAddVocabulary = jest.fn();
  const defaultProps = {
    id: '',
    onAddVocabulary: handleAddVocabulary,
  };

  it('Should render FormVocabulary', () => {
    const { container } = renderWithThemeProvider(
      <FormVocabulary onAddVocabulary={handleAddVocabulary} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should clear input after click button Add', async () => {
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      refetch: jest.fn().mockResolvedValue(MOCK_VOCABULARIES),
    }));

    const { getByTestId, getByText } = renderWithThemeProvider(
      <FormVocabulary {...defaultProps} />,
    );
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

  it('Should clear input after click button Add', async () => {
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      refetch: jest.fn().mockResolvedValue({
        data: jest.fn().mockReturnValue([]),
      }),
    }));

    const { getByTestId, getByText } = renderWithThemeProvider(
      <FormVocabulary {...defaultProps} />,
    );
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
});
