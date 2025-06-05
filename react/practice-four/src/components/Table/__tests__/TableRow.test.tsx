// Components
import { TableCell, TableRow } from '@components';

// Helpers
import { renderWithThemeProvider } from '@helpers';

describe('Testing Table row component', () => {
  const children = (
    <>
      <TableCell>January</TableCell>
      <TableCell>$100</TableCell>
    </>
  );

  it('Should renders children correctly', () => {
    const { getByText } = renderWithThemeProvider(<TableRow>{children}</TableRow>);

    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });
});
