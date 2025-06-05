import { render, screen } from '@testing-library/react';

// Components
import { TableCell } from '@components';

describe('Testing Table cell component', () => {
  it('Should renders children correctly', () => {
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

  it('Should renders title correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <tr>
            <TableCell title='Title'>Test</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    expect(getByText('Title')).toBeInTheDocument();
  });

  it('Should renders table cell as th tag', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell tagName='th'>Test</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const tagTd = screen.getByTestId('table-cell');
    expect(tagTd.tagName).toBe('TH');
  });

  it('Should renders table cell as td by default', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>Test</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const tagTd = screen.getByTestId('table-cell');
    expect(tagTd.tagName).toBe('TD');
  });
});
