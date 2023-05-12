import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Identity } from '@components';

describe('Testing identity component', () => {
  const handleClick = jest.fn();

  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    url: '',
    alt: 'vendôme louis',
    text: 'vendôme louis',
    onClick: handleClick,
  };

  it('Should render Identity', () => {
    const { container } = render(<Identity {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call onClick event when click to image and text', () => {
    render(<Identity {...defaultProps} />);

    const image = screen.getByRole('img', {
      name: /vendôme louis/i,
    });
    fireEvent.click(image);

    const text = screen.getByText(/vendôme louis/i);
    fireEvent.click(text);

    expect(handleClick).toBeCalled();
    expect(handleClick).toBeCalledTimes(2);
  });

  it('Should render Identity in the circle shape correctly', () => {
    render(<Identity {...defaultProps} isCircle={true} />);

    const image = screen.getByRole('img', {
      name: /vendôme louis/i,
    });
    const figure = screen.getByRole('figure');

    expect(image).toHaveClass('image-circle');
    expect(figure).toHaveClass('image-size-xs');
  });
});
