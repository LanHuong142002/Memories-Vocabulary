import { render } from '@testing-library/react';
import { Table } from '@components';

describe('Testing Table component', () => {
  const children = (
    <>
      <thead data-testid='table-header'>
        <tr>
          <th>The table header</th>
        </tr>
      </thead>
      <tbody data-testid='table-body'>
        <tr>
          <td>The table body</td>
          <td>with two columns</td>
        </tr>
      </tbody>
    </>
  );

  it('Should render children correctly', () => {
    const { getByTestId } = render(<Table>{children}</Table>);
    const tableHeader = getByTestId('table-header');
    const tableBody = getByTestId('table-body');

    expect(tableHeader).toBeInTheDocument();
    expect(tableHeader.children.length).toBe(1);
    expect(tableBody).toBeInTheDocument();
    expect(tableBody.children.length).toBe(1);
  });

  it('Should have the correct class name', () => {
    const { getByRole } = render(<Table>{children}</Table>);
    const table = getByRole('table');

    expect(table).toHaveClass('table-wrapper');
  });
});
