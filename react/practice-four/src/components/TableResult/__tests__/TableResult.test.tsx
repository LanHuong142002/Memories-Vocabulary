import { render } from '@testing-library/react';

// Mocks
import { MOC_TABLE_RESULT } from '@mocks';

// Components
import { TableResult } from '@components';

describe('Should test table result component', () => {
  it('Should render table result component', () => {
    const { container, getAllByTestId } = render(<TableResult result={MOC_TABLE_RESULT} />);

    expect(container).toBeInTheDocument();
    expect(getAllByTestId('table-row').length).toBe(4);
  });

  it('Should render table result dark component', () => {
    const { container, getAllByTestId } = render(<TableResult result={MOC_TABLE_RESULT} />);

    expect(container).toBeInTheDocument();
    expect(getAllByTestId('table-row').length).toBe(4);
  });
});
