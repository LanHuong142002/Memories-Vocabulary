import { render } from '@testing-library/react';
import { Table } from '@components';

describe('Testing Table component', () => {
  const children = (
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
  );

  it('Should render children correctly', () => {
    const { getByRole } = render(<Table>{children}</Table>);
    const tableRow = getByRole('row');

    expect(tableRow).toBeInTheDocument();
    expect(tableRow.children).toHaveLength(2);
  });

  it('Should have the correct class name', () => {
    const { getByRole } = render(<Table>{children}</Table>);
    const table = getByRole('table');

    expect(table).toHaveClass('table-wrapper');
  });
});
