import { render } from '@testing-library/react';

// Components
import { TableVocabulary } from '@components';

describe('Test table vocabulary component', () => {
  const defaultValue = {
    onClick: jest.fn(),
    isLoading: false,
    vocabularies: [
      {
        id: '1',
        english: 'pen',
        vietnamese: 'cay but',
      },
      {
        id: '2',
        english: 'eraser',
        vietnamese: 'cuc tay',
      },
      {
        id: '3',
        english: 'book',
        vietnamese: 'cuon sach',
      },
      {
        id: '4',
        english: 'notebook',
        vietnamese: 'cuon vo',
      },
    ],
  };

  it('Should render table vocabulary with list vocabularies', () => {
    const { container, getAllByRole, getByText } = render(<TableVocabulary {...defaultValue} />);

    expect(container).toBeInTheDocument();
    expect(getAllByRole('cell').length).toBe(16);
    expect(getAllByRole('row').length).toBe(5);
    expect(getByText('book')).toBeInTheDocument();
  });

  it('Should render loading when isLoading is true', () => {
    const { container } = render(<TableVocabulary {...defaultValue} isLoading={true} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render row message when table is empty ', () => {
    const { container } = render(<TableVocabulary {...defaultValue} vocabularies={[]} />);

    expect(container).toBeInTheDocument();
  });
});
