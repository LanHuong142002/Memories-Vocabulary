import { render } from '@testing-library/react';

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

  it('Should renders table row with small size', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <TableRow size='s'>{children}</TableRow>
        </tbody>
      </table>,
    );

    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });
});
