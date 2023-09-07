import { act, fireEvent } from '@testing-library/react';

// Constants
import { MESSAGE_ERRORS } from '@constants';

// Contexts
import { VocabularyContext, VocabularyContextType } from '@contexts';

// Mocks
import { MOCK_VOCABULARY_CONTEXT_VALUE, MOC_RESULT, MOC_TABLE_RESULT } from '@mocks';

// Helpers
import { customRender } from '@helpers';

// Components
import { Testing } from '@pages';

jest.useFakeTimers();

const TestingComponent = ({
  value = MOCK_VOCABULARY_CONTEXT_VALUE,
}: {
  value?: VocabularyContextType;
}) => (
  <VocabularyContext.Provider value={value}>
    <Testing />
  </VocabularyContext.Provider>
);

describe('Test Testing Page', () => {
  it('Should render Testing page', () => {
    const { container, getByText } = customRender(<TestingComponent />);

    expect(container).toBeInTheDocument();
    expect(getByText(`1 of ${MOC_TABLE_RESULT.length}`)).toBeInTheDocument();
  });

  it('Should render text Submit Answer in button when step equal with totalStep', () => {
    const { getByText } = customRender(
      <TestingComponent value={{ ...MOCK_VOCABULARY_CONTEXT_VALUE, quizzes: [MOC_RESULT] }} />,
    );

    expect(getByText('Submit Answers')).toBeInTheDocument();
  });

  it('Should render error required when click button Next', () => {
    const { getByRole, getByText } = customRender(<TestingComponent />);

    const button = getByRole('button', {
      name: /next/i,
    });
    fireEvent.click(button);

    expect(getByText(MESSAGE_ERRORS.REQUIRED)).toBeInTheDocument();
  });

  it('Enter value to input and click button submit', () => {
    const { getByRole, getByText } = customRender(<TestingComponent />);

    // Enter value for input
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Text' } });
    // Click button move to next quiz
    const button = getByRole('button', {
      name: /next/i,
    });
    fireEvent.submit(button);
    // Enter value for second input
    fireEvent.change(input, { target: { value: 'Text' } });
    // Click button move to next quiz
    fireEvent.submit(button);
    // Enter value for third input
    fireEvent.change(input, { target: { value: 'Text' } });
    // Click button move to next quiz
    fireEvent.submit(button);

    expect(getByText('Submit Answers')).toBeInTheDocument();
  });

  it('Should render error message when typing number to input', () => {
    const { getByRole, getByText } = customRender(<TestingComponent />);

    const input = getByRole('textbox');
    act(() => {
      fireEvent.change(input, { target: { value: '2' } });
      jest.runAllTimers();
    });

    expect(getByText(MESSAGE_ERRORS.ALPHABETS)).toBeInTheDocument();
  });

  it('Should back to Vocabulary list when quizzes not exist', () => {
    const { getByText } = customRender(
      <TestingComponent value={{ ...MOCK_VOCABULARY_CONTEXT_VALUE, quizzes: [] }} />,
    );

    expect(getByText('0 of 0')).toBeInTheDocument();
  });

  it('Should show loading when isLoading is true', () => {
    const { container } = customRender(
      <TestingComponent value={{ ...MOCK_VOCABULARY_CONTEXT_VALUE, isLoadingQuizzes: true }} />,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should navigate to vocabulary page when dont have any vocabularies', () => {
    const { container } = customRender(
      <TestingComponent value={{ ...MOCK_VOCABULARY_CONTEXT_VALUE, vocabularies: [] }} />,
    );

    expect(container).toBeInTheDocument();
  });
});
