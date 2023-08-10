import { fireEvent, render } from '@testing-library/react';

// Components
import { Topic } from '@components';

describe('Test topic component', () => {
  const handleClick = jest.fn();

  const defaultProps = {
    name: 'School',
    onClick: handleClick,
  };

  it('Should render topic component', () => {
    const { container } = render(<Topic {...defaultProps} quantity={10} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render topic component without quantity', () => {
    const { container } = render(<Topic {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click topic component', () => {
    const { getByText } = render(<Topic {...defaultProps} quantity={10} isAddNew={true} />);

    const topic = getByText('School (10)');
    fireEvent.click(topic);

    expect(handleClick).toHaveBeenCalled();
  });
});
