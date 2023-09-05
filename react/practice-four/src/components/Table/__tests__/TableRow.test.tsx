import { render } from '@testing-library/react';

// Components
import { TableCell, TableRow } from '@components';

describe('Testing Table row component', () => {
  const children = (
    <>
      <TableCell>January</TableCell>
      <TableCell>$100</TableCell>
    </>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(<TableRow>{children}</TableRow>);

    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });
});
