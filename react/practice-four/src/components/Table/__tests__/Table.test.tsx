import { render } from '@testing-library/react';

import { Table } from '..';

describe('Test table component', () => {
  it('Should render table component', () => {
    const { getByTestId } = render(
      <Table>
        <thead data-testid='table-header'>
          <tr>
            <th>table header</th>
          </tr>
        </thead>
        <tbody data-testid='table-body'>
          <tr>
            <td>cell 1</td>
            <td>cell 2</td>
          </tr>
        </tbody>
      </Table>,
    );
    const tableHeader = getByTestId('table-header');
    const tableBody = getByTestId('table-body');

    expect(tableHeader).toBeInTheDocument();
    expect(tableHeader.children.length).toBe(1);
    expect(tableBody).toBeInTheDocument();
    expect(tableBody.children.length).toBe(1);
  });
});
