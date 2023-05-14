import { render } from '@testing-library/react';
import { TableBody } from '@components';

describe('TableBody', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(
      <TableBody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
      </TableBody>,
    );

    expect(getByText('Cell 1')).toBeInTheDocument();
    expect(getByText('Cell 2')).toBeInTheDocument();
  });

  it('Should renders class name correctly', () => {
    const { container } = render(
      <TableBody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
      </TableBody>,
    );
    expect(container.firstChild).toHaveClass('table-body');
  });
});
