import { render, screen } from '@testing-library/react';

// Components
import { TableHeader } from '@components';

describe('TableHeader', () => {
  const children = (
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <TableHeader>{children}</TableHeader>
      </table>,
    );

    expect(getByText('Header 1')).toBeInTheDocument();
    expect(getByText('Header 2')).toBeInTheDocument();
  });

  it('Should renders class name correctly', () => {
    render(
      <table data-testid='table-wrapper'>
        <TableHeader>{children}</TableHeader>
      </table>,
    );
    const table = screen.getByTestId('table-wrapper');

    expect(table.firstChild).toHaveClass('table-header');
  });
});
