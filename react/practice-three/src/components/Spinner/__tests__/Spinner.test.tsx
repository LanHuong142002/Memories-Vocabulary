import { render } from '@testing-library/react';

// Components
import { Spinner } from '@components';

describe('Testing spinner', () => {
  it('Should render component', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });
});
