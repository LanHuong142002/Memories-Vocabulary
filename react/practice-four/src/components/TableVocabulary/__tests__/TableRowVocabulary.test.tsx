import { act, fireEvent } from '@testing-library/react';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { TableRowEmpty, TableRowLoading, TableRowVocabulary } from '@components';

// Hooks
import * as hooks from '@hooks';

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));
jest.mock('@services', () => ({
  ...jest.requireActual('@services'),
}));

describe('Test table row vocabulary component', () => {
  const defaultProps = {
    topicId: '1',
    order: 1,
    id: '1',
    english: 'pen',
    vietnamese: 'cay but',
    isLoading: false,
    onClick: jest.fn(),
  };

  it('Should render table row vocabulary component', () => {
    const { container, getByText } = renderWithThemeProvider(
      <TableRowVocabulary {...defaultProps} />,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('pen')).toBeInTheDocument();
    expect(getByText('cay but')).toBeInTheDocument();
  });

  it('Should render table row vocabulary with loading', () => {
    (jest.spyOn(hooks, 'useMutationDeleteVocabulary') as jest.Mock).mockImplementation(() => ({
      isLoading: true,
      mutate: jest.fn(),
    }));
    const { getByTestId } = renderWithThemeProvider(<TableRowVocabulary {...defaultProps} />);

    expect(getByTestId('loading')).toBeInTheDocument();
  });

  it('Should call function delete when click the button delete', () => {
    (jest.spyOn(hooks, 'useMutationDeleteVocabulary') as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      mutate: jest.fn(),
    }));
    const { getByText } = renderWithThemeProvider(<TableRowVocabulary {...defaultProps} />);

    act(() => {
      const buttonDelete = getByText('X');
      fireEvent.click(buttonDelete);
    });
    act(() => {
      const button = getByText('Delete');
      fireEvent.click(button);
    });
  });
});

describe('Test TableRowEmpty', () => {
  it('Should render table empty component', () => {
    const { container, getByText } = renderWithThemeProvider(<TableRowEmpty>Test</TableRowEmpty>);

    expect(container).toBeInTheDocument();
    expect(getByText('Test')).toBeInTheDocument();
  });
});

describe('Test TableRowLoading', () => {
  it('Should render table empty component', () => {
    const { container } = renderWithThemeProvider(<TableRowLoading />);

    expect(container).toBeInTheDocument();
  });
});
