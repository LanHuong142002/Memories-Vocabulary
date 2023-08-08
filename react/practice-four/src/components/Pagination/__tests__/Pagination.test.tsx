import { fireEvent, render } from '@testing-library/react';
import { Pagination } from '..';

describe('Test pagination component', () => {
  const defaultProps = {
    onFirstList: jest.fn(),
    onLastList: jest.fn(),
    onNext: jest.fn(),
    onPrev: jest.fn(),
  };

  it('Should render pagination component', () => {
    const { container } = render(<Pagination {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should call onClick when click 4 buttons in pagination component', () => {
    const { getByRole } = render(<Pagination {...defaultProps} />);

    const buttonFirst = getByRole('button', {
      name: /«/,
    });
    const buttonLast = getByRole('button', {
      name: /»/,
    });
    const buttonNext = getByRole('button', {
      name: />/,
    });
    const buttonPrev = getByRole('button', {
      name: /</,
    });

    fireEvent.click(buttonFirst);
    fireEvent.click(buttonLast);
    fireEvent.click(buttonNext);
    fireEvent.click(buttonPrev);

    expect(defaultProps.onFirstList).toBeCalled();
    expect(defaultProps.onLastList).toBeCalled();
    expect(defaultProps.onNext).toBeCalled();
    expect(defaultProps.onPrev).toBeCalled();
  });
});
