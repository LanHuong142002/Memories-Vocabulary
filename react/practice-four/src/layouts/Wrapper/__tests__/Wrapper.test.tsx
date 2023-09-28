import { act } from '@testing-library/react';
import * as reactRouter from 'react-router-dom';

// Contexts
import {
  ThemeContext,
  ThemeProviderProps,
  TopicContext,
  TopicContextType,
  VocabularyContext,
  VocabularyContextType,
} from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Components
import { Wrapper } from '@layouts';

// Helpers
import { renderWithThemeProvider } from '@helpers';

jest.useFakeTimers();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const handleToggleTheme = jest.fn();

const mockThemeContext = {
  theme: 'light',
  onToggleTheme: handleToggleTheme,
} as ThemeProviderProps;

const mockLocation = {
  pathname: '/123123',
  state: null,
  key: '',
  search: '',
  hash: '',
};

const WrapperComponent = ({ value = mockThemeContext }: { value?: ThemeProviderProps }) => (
  <ThemeContext.Provider value={value}>
    <Wrapper className='testing' childrenTitle={<p>Title</p>}>
      <p>Wrapper body</p>
    </Wrapper>
  </ThemeContext.Provider>
);

describe('Test Wrapper component', () => {
  it('Should render Wrapper component', () => {
    const { container } = renderWithThemeProvider(<WrapperComponent />);

    expect(container).toBeInTheDocument();
  });

  it('Should render a tag with href is home ', () => {
    jest.spyOn(reactRouter, 'useLocation').mockReturnValue(mockLocation);
    const { getByText } = renderWithThemeProvider(
      <WrapperComponent value={{ ...mockThemeContext, theme: 'dark' }} />,
    );

    expect(getByText('Back to Home').closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });

  it('Should render notification when have any error from topics', () => {
    const { getByText } = renderWithThemeProvider(
      <TopicContext.Provider value={{ errorsTopic: 'Error' } as TopicContextType}>
        <WrapperComponent />
      </TopicContext.Provider>,
    );

    act(() => {
      jest.runAllTimers();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });

  it('Should render notification when have any error from vocabulary', () => {
    const { getByText } = renderWithThemeProvider(
      <VocabularyContext.Provider value={{ errorsVocabulary: 'Error' } as VocabularyContextType}>
        <WrapperComponent />
      </VocabularyContext.Provider>,
    );

    act(() => {
      jest.runAllTimers();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });
});
