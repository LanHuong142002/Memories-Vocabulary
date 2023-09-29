import { act, waitFor } from '@testing-library/react';
import ShowModalConfirmDelete from '../ShowModalConfirmDelete';

// Helpers
import { fireEvent, renderWithThemeProvider } from '@helpers';

describe('Test ShowModalConfirmDelete', () => {
  const handleDeleteVocabulary = jest.fn();
  const defaultProps = {
    topicId: '1',
    onDeleteVocabulary: handleDeleteVocabulary,
  };

  it('Should render ShowModalConfirmDelete', () => {
    const { container } = renderWithThemeProvider(<ShowModalConfirmDelete {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should call function onDeleteVocabulary after click button Delete', () => {
    const { getByText } = renderWithThemeProvider(<ShowModalConfirmDelete {...defaultProps} />);

    act(() => {
      const buttonDelete = getByText('X');
      fireEvent.click(buttonDelete);
    });
    act(() => {
      const button = getByText('Delete');
      fireEvent.click(button);
    });

    waitFor(() => {
      expect(handleDeleteVocabulary).toBeCalled();
    });
  });
});
