import { render } from '@testing-library/react';

// Components
import { TableCell } from '@components';

describe('Test table cell component', () => {
  it('Should renders children correctly with td tag', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Should renders children correctly with th tag', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell color='failed' className='test'>
              Test
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );

    expect(getByText('Test')).toBeInTheDocument();
  });
});
