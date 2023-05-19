import { render } from '@testing-library/react';
import { TableHeader } from '@components';

describe('TableHeader', () => {
  const children = (
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  );

  it('Should renders children correctly', () => {
    const { getByText } = render(<TableHeader>{children}</TableHeader>);

    expect(getByText('Header 1')).toBeInTheDocument();
    expect(getByText('Header 2')).toBeInTheDocument();
  });

  it('Should renders class name correctly', () => {
    const { container } = render(<TableHeader>{children}</TableHeader>);

    expect(container.firstChild).toHaveClass('table-header');
  });
});
