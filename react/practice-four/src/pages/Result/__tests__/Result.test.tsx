// Mocks
import { MOCK_TABLE_RESULT, MOC_RESULT } from '@mocks';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { Result } from '@pages';
import * as stores from '@stores';

jest.mock('@stores', () => ({
  ...jest.requireActual('@stores'),
}));

describe('Test Result component', () => {
  it('Should render Result component', () => {
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: MOCK_TABLE_RESULT,
      vocabularies: MOCK_TABLE_RESULT,
    }));
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });

  it('Should use empty string when quizzes have one quiz dont have value', () => {
    const mockResult = [{ ...MOC_RESULT, answer: '' }];
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: mockResult,
      vocabularies: mockResult,
    }));
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });
});
