import { render } from '@testing-library/react';
import { TableRow } from '@components';

describe('Testing Table row component', () => {
  const children = (
    <>
      <td>January</td>
      <td>$100</td>
    </>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(<TableRow>{children}</TableRow>);

    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });

  it('Should renders table row with header class', () => {
    const { container } = render(<TableRow classTableRow='header'>{children}</TableRow>);

    expect(container.firstChild).toHaveClass('table-row-header');
  });

  it('Should renders table row with message class', () => {
    const { container } = render(<TableRow classTableRow='message'>{children}</TableRow>);

    expect(container.firstChild).toHaveClass('table-row-message');
  });
});
