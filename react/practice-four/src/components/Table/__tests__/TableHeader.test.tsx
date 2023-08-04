import { render } from '@testing-library/react';

// Components
import { TableHeader } from '@components';

describe('Test table header component', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(
      <table>
        <TableHeader>
          <tr>
            <th>header 1</th>
            <th>header 2</th>
          </tr>
        </TableHeader>
      </table>,
    );

    expect(getByText('header 1')).toBeInTheDocument();
    expect(getByText('header 2')).toBeInTheDocument();
  });
});
