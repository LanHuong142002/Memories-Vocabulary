import { render } from '@testing-library/react';
import { ErrorPage } from '@pages';

describe('Test Error Page', () => {
  it('Should render Error Page', () => {
    const { container, getByText } = render(<ErrorPage />);

    expect(container).toBeInTheDocument();
    expect(getByText('404')).toBeInTheDocument();
  });
});
