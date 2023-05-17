import { render, screen } from '@testing-library/react';
import { TableCell } from '@components';

describe('Testing Table cell component', () => {
  it('Should renders children correctly', () => {
    const { getByText } = render(<TableCell>Test</TableCell>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Should renders title correctly', () => {
    const { getByText } = render(<TableCell title='Title'>Test</TableCell>);
    expect(getByText('Title')).toBeInTheDocument();
  });

  it('Should renders table cell as th tag', () => {
    render(<TableCell tagName='th'>Test</TableCell>);

    const tagTd = screen.getByTestId('table-cell');
    expect(tagTd.tagName).toBe('TH');
  });

  it('Should renders table cell as td by default', () => {
    render(<TableCell>Test</TableCell>);

    const tagTd = screen.getByTestId('table-cell');
    expect(tagTd.tagName).toBe('TD');
  });
});
