// Mocks
import { MOCK_TABLE_RESULT, MOCK_RESULT } from '@mocks';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { Result } from '@pages';
import * as stores from '@stores';
import * as reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));
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

  it('Should call navigate when dont have any quizzes', () => {
    jest.spyOn(reactRouterDom, 'useNavigate').mockImplementation(() => jest.fn());
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: [],
      vocabularies: MOCK_TABLE_RESULT,
    }));
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });

  it('Should use empty string when quizzes have one quiz dont have value', () => {
    const mockResult = [{ ...MOCK_RESULT, answer: '' }];
    jest.spyOn(stores, 'useVocabulariesStores').mockImplementation(() => ({
      quizzes: mockResult,
      vocabularies: mockResult,
    }));
    const { container } = renderWithThemeProvider(<Result />);

    expect(container).toBeInTheDocument();
  });
});
