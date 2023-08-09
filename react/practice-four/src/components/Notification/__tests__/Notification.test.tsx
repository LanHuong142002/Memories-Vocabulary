import { render } from '@testing-library/react';

// Components
import { Notification } from '@components';

describe('Test notification component', () => {
  const defaultProps = {
    title: 'Something went wrong',
    description: 'error',
  };

  it('Should render notification component', () => {
    const { container } = render(<Notification {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render notification dark component', () => {
    const { container } = render(<Notification theme='dark' {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });
});
