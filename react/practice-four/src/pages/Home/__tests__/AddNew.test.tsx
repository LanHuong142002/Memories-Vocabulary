import { act, fireEvent, waitFor } from '@testing-library/react';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import AddNew from '../AddNew';

describe('Test AddNew', () => {
  const handleAddTopic = jest.fn();

  it('Should render AddNew', () => {
    const { container } = renderWithThemeProvider(<AddNew onAddTopic={handleAddTopic} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    const { getByText } = renderWithThemeProvider(<AddNew onAddTopic={handleAddTopic} />);

    act(() => {
      // Click button add topic
      const buttonAddTopic = getByText('Add Topic');
      fireEvent.click(buttonAddTopic);
    });

    waitFor(() => {
      const overlayAddNew = getByText('Add New Topic');
      expect(overlayAddNew).toBeInTheDocument();
    });
  });
});
