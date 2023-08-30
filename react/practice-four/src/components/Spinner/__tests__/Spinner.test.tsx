import { render } from '@testing-library/react';

// Constants
import { VARIANT } from '@constants';

// Components
import { Spinner } from '@components';

describe('Testing spinner', () => {
  it('Should render spinner default component', () => {
    const { container } = render(<Spinner />);

    expect(container).toBeInTheDocument();
  });

  it('Should render spinner primary component', () => {
    const { container } = render(<Spinner variant={VARIANT.PRIMARY} />);

    expect(container).toBeInTheDocument();
  });
});
