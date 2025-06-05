import { cleanup, render, screen } from '@testing-library/react';

// Components
import { Identity } from '@components';

describe('Testing identity component', () => {
  afterEach(() => {
    cleanup();
  });

  const defaultProps = {
    url: '',
    alt: 'vendôme louis',
    text: 'vendôme louis',
  };

  it('Should render Identity', () => {
    const { container } = render(<Identity {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render Identity with circle shape', () => {
    render(<Identity {...defaultProps} isCircle={true} />);

    const identity = screen.getByTestId('identity-wrapper');

    expect(identity).toBeInTheDocument();
  });

  it('Should render Identity with default shape', () => {
    render(<Identity {...defaultProps} isCircle={false} />);

    const identity = screen.getByTestId('identity-wrapper');

    expect(identity).toBeInTheDocument();
  });
});
