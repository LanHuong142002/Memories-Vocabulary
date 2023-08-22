import { fireEvent, render } from '@testing-library/react';

// Components
import { Pagination } from '@components';

describe('Test pagination component', () => {
  const defaultProps = {
    onNext: jest.fn(),
    onPrev: jest.fn(),
  };

  it('Should render pagination component', () => {
    const { container } = render(<Pagination {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click 4 buttons in pagination component', () => {
    const { getByRole } = render(<Pagination {...defaultProps} />);

    const buttonNext = getByRole('button', {
      name: /»/,
    });
    const buttonPrev = getByRole('button', {
      name: /«/,
    });

    fireEvent.click(buttonNext);
    fireEvent.click(buttonPrev);

    expect(defaultProps.onNext).toBeCalled();
    expect(defaultProps.onPrev).toBeCalled();
  });
});
