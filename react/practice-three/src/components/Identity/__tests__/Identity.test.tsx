import { cleanup, render, screen } from '@testing-library/react';
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

  it('Should render Identity with class correctly', () => {
    render(<Identity {...defaultProps} />);

    const identity = screen.getByTestId('identity-wrapper');

    expect(identity).toBeInTheDocument();
    expect(identity).toHaveClass('identity-wrapper');
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
