import { render } from '@testing-library/react';

// Mocks
import { mockResult } from '@mocks';

// Components
import { TableRowResult } from '@components';

describe('Test table row result component', () => {
  it('Should render table row result', () => {
    const { container, getAllByText, getByText } = render(
      <TableRowResult
        answer={mockResult.answer}
        order={1}
        isSuccess={mockResult.isSuccess}
        native={mockResult.native}
        translation={mockResult.translation}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(getByText('pen')).toBeInTheDocument();
    expect(getAllByText('cay but').length).toBe(2);
  });

  it('Should render table row result have case failed', () => {
    const { container, getAllByText } = render(
      <TableRowResult
        answer={mockResult.answer}
        order={1}
        isSuccess={false}
        native={mockResult.native}
        translation={mockResult.translation}
      />,
    );

    expect(container).toBeInTheDocument();
    expect(getAllByText('✘').length).toBe(2);
  });
});
