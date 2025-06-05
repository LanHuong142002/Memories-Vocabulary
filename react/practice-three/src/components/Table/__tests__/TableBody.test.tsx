import { render, screen } from '@testing-library/react';

// Components
import { TableBody } from '@components';

describe('Testing Table body component', () => {
  const children = (
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <TableBody>{children}</TableBody>
      </table>,
    );

    expect(getByText('Cell 1')).toBeInTheDocument();
    expect(getByText('Cell 2')).toBeInTheDocument();
  });

  it('Should renders class name correctly', () => {
    render(
      <table data-testid='table-wrapper'>
        <TableBody>{children}</TableBody>
      </table>,
    );
    const table = screen.getByTestId('table-wrapper');

    expect(table.firstChild).toHaveClass('table-body');
  });
});
