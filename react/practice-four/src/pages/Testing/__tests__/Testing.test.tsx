// Mocks
import { MOCK_VOCABULARIES } from '@mocks';

// Hooks
import * as hooks from '@hooks';

// Helpers
import { renderWithThemeProvider } from '@helpers';

// Components
import { Testing } from '@pages';

jest.useFakeTimers();
jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
}));

describe('Test Testing Page', () => {
  it('Should render Testing page and description with total quizzes', () => {
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      data: MOCK_VOCABULARIES,
      isSuccess: true,
      isLoading: false,
    }));

    const { container, getByText } = renderWithThemeProvider(<Testing />);

    expect(container).toBeInTheDocument();
    expect(getByText(`1 of ${MOCK_VOCABULARIES.length}`)).toBeInTheDocument();
  });

  it('Should render Testing page with loading', () => {
    (jest.spyOn(hooks, 'useVocabularies') as jest.Mock).mockImplementation(() => ({
      isSuccess: false,
      isLoading: true,
    }));

    const { getByTestId } = renderWithThemeProvider(<Testing />);

    expect(getByTestId('loading')).toBeInTheDocument();
  });
});
