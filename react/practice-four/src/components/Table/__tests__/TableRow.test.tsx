import { render } from '@testing-library/react';

// Constants
import { TABLE_ROW_SIZE } from '@constants';

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
          <TableRow size={TABLE_ROW_SIZE.S}>{children}</TableRow>
        </tbody>
      </table>,
    );

    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
  });
});
