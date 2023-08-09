import { render } from '@testing-library/react';

// Components
import { Typography } from '@components';

describe('Test typography component', () => {
  it('Should render typography component', () => {
    const { container, getByText } = render(
      <Typography theme='light' color='primary' tagName='p' size='xs'>
        Lorem
      </Typography>,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('Lorem').textContent).toBe('Lorem');
  });

  it('Should render typography default component', () => {
    const { container, getByText } = render(<Typography>Lorem</Typography>);

    expect(container).toBeInTheDocument();
    expect(getByText('Lorem').textContent).toBe('Lorem');
  });
});
