// Components
import { TableRowVocabulary } from '@components';
import { renderWithThemeProvider } from '@helpers';

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

  it('Should not render anything when isLoading is true', () => {
    const { container } = renderWithThemeProvider(<TableRowVocabulary {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });
});
