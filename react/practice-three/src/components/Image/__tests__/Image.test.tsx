import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// Components
import { Image, ImageProps } from '@components';

describe('Testing Image component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    url: 'image.jpg',
  } as ImageProps;

  it('Should render Image', () => {
    const { container } = render(<Image {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call onClick event when click on image', () => {
    const handleClick = jest.fn();
    render(<Image {...defaultProps} isClickable={true} onClick={handleClick} />);

    const figure = screen.getByRole('figure');
    fireEvent.click(figure);

    expect(handleClick).toBeCalled();
    expect(handleClick).toBeCalledTimes(1);
  });

  it('Should render image with circle shape', () => {
    const handleClick = jest.fn();
    render(<Image {...defaultProps} isCircle={true} isClickable={false} />);

    const figure = screen.getByRole('figure');
    fireEvent.click(figure);

    expect(handleClick).not.toBeCalled();
  });
});
