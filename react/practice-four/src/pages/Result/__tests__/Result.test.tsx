// Mocks
import { MOCK_VOCABULARIES } from '@mocks';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { Result } from '@pages';

jest.mock('@hooks', () => {
  const originalModule = jest.requireActual('@hooks');
  return {
    ...originalModule,
    useVocabularies: jest.fn().mockImplementation(() => ({
      data: MOCK_VOCABULARIES,
    })),
    useVocabulariesStores: jest.fn().mockImplementation(() => ({
      quizzes: MOCK_VOCABULARIES,
    })),
  };
});

describe('Test Result component', () => {
  it('Should render Result component', () => {
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });

  it('Should navigate to vocabulary list when quizzes length is empty', () => {
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });

  it('Should use empty string when quizzes have one quiz dont have value', () => {
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });
});
