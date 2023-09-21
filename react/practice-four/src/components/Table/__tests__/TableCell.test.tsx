import { render } from '@testing-library/react';

// Constants
import { TABLE_CELL_COLOR } from '@constants';

// Components
import { TableCell } from '@components';

describe('Test table cell component', () => {
  it('Should renders children correctly with table cell failed', () => {
    const { getByText } = render(<TableCell color={TABLE_CELL_COLOR.FAILED}>Test</TableCell>);

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Should renders children correctly with table cell success', () => {
    const { getByText } = render(<TableCell color={TABLE_CELL_COLOR.SUCCESS}>Test</TableCell>);

    expect(getByText('Test')).toBeInTheDocument();
  });
});
