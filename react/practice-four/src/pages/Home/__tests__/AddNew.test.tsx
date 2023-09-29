import { act, fireEvent, waitFor } from '@testing-library/react';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import AddNew from '../AddNew';

describe('Test AddNew', () => {
  it('Should render AddNew', () => {
    const { container } = renderWithThemeProvider(<AddNew />);

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    const { getByText } = renderWithThemeProvider(<AddNew />);

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

  it('Should render input with value entered', async () => {
    const { getByText, getByPlaceholderText } = renderWithThemeProvider(<AddNew />);

    act(() => {
      // Click button Add Topic
      const topic = getByText('Add Topic');
      fireEvent.click(topic);
    });

    const input = getByPlaceholderText('Topic Name');
    act(() => {
      const button = getByText('Done');
      // Enter invalid value for input
      fireEvent.change(input, { target: { value: '222' } });
      // Enter valid value for input
      fireEvent.change(input, { target: { value: 'aaa' } });
      fireEvent.submit(button);
    });

    await waitFor(() => {
      expect(input).toHaveValue('aaa');
    });
  });
});
