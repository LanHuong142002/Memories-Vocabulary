import { render } from '@testing-library/react';
import { TableResult } from '..';

describe('Should test table result component', () => {
  const mockData = [
    {
      isSuccess: true,
      no: 1,
      native: 'pen',
      translation: 'cay but',
      answer: 'cay but',
    },
    {
      isSuccess: false,
      no: 2,
      native: 'book',
      translation: 'quyen sach',
      answer: 'cuon sach',
    },
    {
      isSuccess: true,
      no: 3,
      native: 'notebook',
      translation: 'quyen vo',
      answer: 'quyen vo',
    },
  ];

  it('Should render table result component', () => {
    const { container, getAllByRole } = render(<TableResult result={mockData} />);

    expect(container).toBeInTheDocument();
    expect(getAllByRole('row').length).toBe(8);
  });

  it('Should render table result dark component', () => {
    const { container, getAllByRole } = render(<TableResult result={mockData} theme='dark' />);

    expect(container).toBeInTheDocument();
    expect(getAllByRole('row').length).toBe(8);
  });
});
