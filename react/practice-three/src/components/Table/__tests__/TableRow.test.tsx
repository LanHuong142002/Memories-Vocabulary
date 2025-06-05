import { render, screen } from '@testing-library/react';

// Components
import { TableRow } from '@components';

describe('Testing Table row component', () => {
  const children = (
    <>
      <td>January</td>
      <td>$100</td>
    </>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <TableRow>{children}</TableRow>
        </tbody>
      </table>,
    );

    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });

  it('Should renders table row with header class', () => {
    render(
      <table>
        <tbody data-testid='table-body-wrapper'>
          <TableRow classTableRow='header'>{children}</TableRow>
        </tbody>
      </table>,
    );
    const tableBody = screen.getByTestId('table-body-wrapper');

    expect(tableBody.firstChild).toHaveClass('table-row');
  });
});
