import { render } from '@testing-library/react';

// Components
import { TableBody } from '@components';

describe('Test table body component', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <TableBody>
          <tr>
            <td>cell 1</td>
            <td>cell 2</td>
          </tr>
        </TableBody>
      </table>,
    );

    expect(getByText('cell 1')).toBeInTheDocument();
    expect(getByText('cell 2')).toBeInTheDocument();
  });
});
