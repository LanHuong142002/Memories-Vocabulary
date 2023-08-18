import { DictionaryContext, DictionaryType, ThemeProvider } from '@contexts';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '..';
import { MOCK_TOPICS } from '@mocks';
import { ReactNode } from 'react';

const mockDictionaryContext = {
  isLoadingTopic: false,
  isLoadingVocabulary: false,
  errorsTopic: '',
  errorsVocabulary: '',
  topics: MOCK_TOPICS,
  vocabularies: [],
  quizzes: [],
  onAddTopic: jest.fn(),
  onAddVocabulary: jest.fn(),
  onDeleteVocabulary: jest.fn(),
  onGetVocabularies: jest.fn(),
  onRandomQuizzes: jest.fn(),
  onSetQuiz: jest.fn(),
};

const HomePageComponent = ({
  children,
  value = mockDictionaryContext,
}: {
  children: ReactNode;
  value?: DictionaryType;
}) => (
  <BrowserRouter>
    <ThemeProvider>
      <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Test Home Page', () => {
  it('Should render Home page', () => {
    const { container } = render(
      <HomePageComponent>
        <HomePage />
      </HomePageComponent>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should render overlay add new topic when click to button Add Topic', () => {
    const { getByText } = render(
      <HomePageComponent>
        <HomePage />
      </HomePageComponent>,
    );
    const buttonAddTopic = getByText('Add Topic');
    fireEvent.click(buttonAddTopic);
    const overlayAddNew = getByText('Add New Topic');

    expect(overlayAddNew).toBeInTheDocument();
  });

  it('Should show loading when isLoadingTopic is true', () => {
    const { container } = render(
      <HomePageComponent value={{ ...mockDictionaryContext, isLoadingTopic: true }}>
        <HomePage />
      </HomePageComponent>,
    );
    const topics = container.querySelectorAll('.topic');

    expect(topics.length).toBe(0);
  });

  //   it('Should redirect to Vocabulary page with id', () => {
  //     const mockNavigate = jest.fn();
  //     (useNavigate as jest.Mock).mockRejectedValue({
  //       navigate: mockNavigate,
  //     });
  //     const { getByText } = render(
  //       <HomePageComponent>
  //         <HomePage />
  //       </HomePageComponent>,
  //     );

  //     const topic = getByText(MOCK_TOPIC.name);
  //     fireEvent.click(topic);
  //     expect(mockNavigate).toHaveBeenCalledWith(`${ROUTES.VOCABULARY}/${1}`);
  //   });
});
