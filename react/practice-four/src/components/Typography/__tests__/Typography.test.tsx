import { render } from '@testing-library/react';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_VARIANT } from '@constants';

// Components
import { Typography } from '@components';

describe('Test typography component', () => {
  it('Should render typography component', () => {
    const { container, getByText } = render(
      <Typography
        variant={TYPOGRAPHY_VARIANT.PRIMARY}
        tagName={TYPOGRAPHY_TAG_NAME.P}
        size={TYPOGRAPHY_SIZE.XS}
      >
        Lorem
      </Typography>,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('Lorem').textContent).toBe('Lorem');
  });

  it('Should render typography default component', () => {
    const { container, getByText } = render(<Typography className='highlight'>Lorem</Typography>);

    expect(container).toBeInTheDocument();
    expect(getByText('Lorem').textContent).toBe('Lorem');
  });
});
