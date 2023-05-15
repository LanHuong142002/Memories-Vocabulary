import { render } from '@testing-library/react';
import { Header } from '@layouts';

describe('Testing Header component', () => {
  it('Should render the correct text', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Management')).toBeInTheDocument();
  });

  it('Should have the correct class name', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass('header-wrapper');
  });
});
