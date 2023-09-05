import { render } from '@testing-library/react';

// Components
import { TableCell } from '@components';

describe('Test table cell component', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(<TableCell className='test'>Test</TableCell>);

    expect(getByText('Test')).toBeInTheDocument();
  });
});
