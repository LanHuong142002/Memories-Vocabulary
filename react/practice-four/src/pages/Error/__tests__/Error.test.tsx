import { render } from '@testing-library/react';
import { Error } from '@pages';

describe('Test Error Page', () => {
  it('Should render Error Page', () => {
    const { container, getByText } = render(<Error />);

    expect(container).toBeInTheDocument();
    expect(getByText('404')).toBeInTheDocument();
  });
});
