// Mocks
import { MOC_RESULT } from '@mocks';

// Components
import { TableRowResult } from '@components';

// Helpers
import { renderWithThemeProvider } from '@helpers';

describe('Test table row result component', () => {
  it('Should render table row result', () => {
    const { container, getAllByText, getByText } = renderWithThemeProvider(
      <TableRowResult
        id='1'
        answer={MOC_RESULT.answer}
        order={'1'}
        isSuccess={MOC_RESULT.isSuccess}
        english={MOC_RESULT.english}
        vietnamese={MOC_RESULT.vietnamese}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('pen')).toBeInTheDocument();
    expect(getAllByText('cay but').length).toBe(2);
  });

  it('Should render table row result have case failed', () => {
    const { container, getAllByText } = renderWithThemeProvider(
      <TableRowResult
        id='1'
        answer={MOC_RESULT.answer}
        order={'1'}
        isSuccess={false}
        english={MOC_RESULT.english}
        vietnamese={MOC_RESULT.vietnamese}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(getAllByText('✘').length).toBe(2);
  });
});
