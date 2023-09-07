import { fireEvent, render } from '@testing-library/react';

// Components
import { TableRowVocabulary } from '@components';

describe('Test table row vocabulary component', () => {
  const defaultProps = {
    order: 1,
    id: '1',
    english: 'pen',
    vietnamese: 'cay but',
    isLoading: false,
    onClick: jest.fn(),
  };

  it('Should render table row vocabulary component', () => {
    const { container, getByText } = render(<TableRowVocabulary {...defaultProps} />);

    expect(container).toBeInTheDocument();
    expect(getByText('pen')).toBeInTheDocument();
    expect(getByText('cay but')).toBeInTheDocument();
  });

  it('Should call onClick when click in action of table row vocabulary', () => {
    const handleOnClick = jest.fn();
    const { getByRole } = render(<TableRowVocabulary {...defaultProps} onClick={handleOnClick} />);

    const button = getByRole('button');
    fireEvent.click(button);

    expect(handleOnClick).toBeCalled();
  });

  it('Should not render anything when isLoading is true', () => {
    const { container } = render(<TableRowVocabulary {...defaultProps} isLoading={true} />);

    expect(container).toBeInTheDocument();
  });
});
