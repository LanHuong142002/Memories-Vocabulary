// Contexts
import { VocabularyContext, VocabularyContextType } from '@contexts';

// Mocks
import { MOCK_VOCABULARY_CONTEXT_VALUE, MOC_RESULT } from '@mocks';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { Result } from '@pages';

const ResultComponent = ({
  value = MOCK_VOCABULARY_CONTEXT_VALUE,
}: {
  value?: VocabularyContextType;
}) => (
  <VocabularyContext.Provider value={value}>
    <Result />
  </VocabularyContext.Provider>
);

describe('Test Result component', () => {
  it('Should render Result component', () => {
    const { container } = renderWithThemeProvider(<ResultComponent />);

    expect(container).toBeInTheDocument();
  });

  it('Should navigate to vocabulary list when quizzes length is empty', () => {
    const { container } = renderWithThemeProvider(
      <ResultComponent value={{ ...MOCK_VOCABULARY_CONTEXT_VALUE, quizzes: [] }} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should use empty string when quizzes have one quiz dont have value', () => {
    const { container } = renderWithThemeProvider(
      <ResultComponent
        value={{
          ...MOCK_VOCABULARY_CONTEXT_VALUE,
          quizzes: [{ ...MOC_RESULT, answer: undefined }],
        }}
      />,
    );

    expect(container).toBeInTheDocument();
  });
});
