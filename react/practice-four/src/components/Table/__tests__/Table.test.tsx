import { render } from '@testing-library/react';

// Components
import { Table, TableCell, TableRow } from '@components';

describe('Test table component', () => {
  it('Should render table component with border', () => {
    const { getByTestId } = render(
      <Table className='test' childrenHeader={<p>table header</p>}>
        <TableRow>
          <TableCell>cell 1</TableCell>
          <TableCell>cell 2</TableCell>
        </TableRow>
      </Table>,
    );
    const tableHeader = getByTestId('table-header');
    const tableBody = getByTestId('table-body');

    expect(tableHeader).toBeInTheDocument();
    expect(tableHeader.children.length).toBe(1);
    expect(tableBody).toBeInTheDocument();
    expect(tableBody.children.length).toBe(1);
  });

  it('Should render table component without class', () => {
    const { getByTestId } = render(
      <Table childrenHeader={<p>table header</p>}>
        <TableRow>
          <TableCell>cell 1</TableCell>
          <TableCell>cell 2</TableCell>
        </TableRow>
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
