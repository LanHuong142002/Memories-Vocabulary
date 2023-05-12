import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Image, ImageProps } from '@components';

describe('Testing Image component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    url: '',
  } as ImageProps;

  it('Should render Image', () => {
    const { container } = render(<Image {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call onClick event', () => {
    const handleClick = jest.fn();
    render(<Image {...defaultProps} onClick={handleClick} />);

    const figure = screen.getByRole('figure');
    fireEvent.click(figure);

    expect(handleClick).toBeCalled();
    expect(handleClick).toBeCalledTimes(1);
  });

  it('Testing component have isCircle and isCursorPointer', () => {
    render(<Image {...defaultProps} isCircle={true} isClickable={true} />);

    const figure = screen.getByRole('figure');
    const image = screen.getByRole('img', {
      name: /image/i,
    });

    expect(image).toHaveClass('image-circle');
    expect(figure).toHaveClass('image-size-xs');
  });
});
