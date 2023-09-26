// Mocks
import { MOCK_TABLE_RESULT, MOC_RESULT } from '@mocks';

// Components
import { TableResult } from '@components';

// Helpers
import { renderWithThemeProvider } from '@helpers';

describe('Test result component', () => {
  it('Should render table result component', () => {
    const { container, getAllByTestId } = renderWithThemeProvider(
      <TableResult result={MOCK_TABLE_RESULT} />,
    );

    expect(container).toBeInTheDocument();
    expect(getAllByTestId('table-row').length).toBe(4);
  });

  it('Should render table result component when have answer empty string', () => {
    const { container, getAllByTestId, getAllByText } = renderWithThemeProvider(
      <TableResult result={[...MOCK_TABLE_RESULT, { ...MOC_RESULT, answer: '' }]} />,
    );

    expect(container).toBeInTheDocument();
    expect(getAllByTestId('table-row').length).toBe(5);
    expect(getAllByText('✘').length).toBe(4);
  });
});
