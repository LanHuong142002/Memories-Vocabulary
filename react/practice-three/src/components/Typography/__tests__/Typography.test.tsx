import { cleanup, render, screen } from '@testing-library/react';
import { Typography, TypographyProps } from '@components';

describe('Testing Typography component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    text: 'Management',
    weight: 'regular',
  } as TypographyProps;

  it('Should render Typography component', () => {
    const { container } = render(<Typography {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render default Typography correctly', () => {
    render(<Typography {...defaultProps} />);

    const typography = screen.getByText('Management');

    expect(typography).toHaveClass('typography-color-primary');
    expect(typography).toHaveClass('typography-size-md');
  });

  it('Should render Typography without weight', () => {
    const { container } = render(<Typography text='Management' />);

    expect(container).toMatchSnapshot();
  });
});
