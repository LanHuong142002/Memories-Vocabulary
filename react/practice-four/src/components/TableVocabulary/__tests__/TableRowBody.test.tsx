// Mocks
import { MOCK_VOCABULARIES } from '@mocks';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import TableVocabularyBody from '../TableVocabularyBody';

describe('Test TableRowBody', () => {
  const defaultProps = {
    isAdding: false,
    isLoadingMore: false,
    topicId: '1',
    vocabularies: [MOCK_VOCABULARIES, MOCK_VOCABULARIES],
  };

  it('Should render TableRowBody', () => {
    const { container } = renderWithThemeProvider(<TableVocabularyBody {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it('Should render TableRowBody with loading', () => {
    const { getAllByTestId } = renderWithThemeProvider(
      <TableVocabularyBody {...defaultProps} isAdding={true} />,
    );

    expect(getAllByTestId('loading').length).toBe(2);
  });
});
