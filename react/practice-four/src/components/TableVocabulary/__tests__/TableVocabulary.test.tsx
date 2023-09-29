// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { TableVocabulary } from '@components';
import { MOCK_VOCABULARIES } from '@mocks';

describe('Test table vocabulary component', () => {
  const defaultValue = {
    onClick: jest.fn(),
    isLoading: false,
    isAdding: false,
    isLoadingMore: false,
    deletingById: {
      5: false,
    },
    vocabularies: [
      [
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
      MOCK_VOCABULARIES,
    ],
  };

  it('Should render table vocabulary with list vocabularies', () => {
    const { container, getAllByTestId, getByText } = renderWithThemeProvider(
      <TableVocabulary {...defaultValue} />,
    );

    expect(container).toBeInTheDocument();
    expect(getAllByTestId('table-cell').length).toBe(24);
    expect(getByText('book')).toBeInTheDocument();
  });

  it('Should render loading when isLoading is true', () => {
    const { container } = renderWithThemeProvider(
      <TableVocabulary {...defaultValue} isLoading={true} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render loading in last row when isAdding is true', () => {
    const { container } = renderWithThemeProvider(
      <TableVocabulary {...defaultValue} isAdding={true} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render row message when table is empty ', () => {
    const { getByText } = renderWithThemeProvider(
      <TableVocabulary {...defaultValue} vocabularies={[]} />,
    );

    expect(getByText('ENTER')).toBeInTheDocument();
  });
});
