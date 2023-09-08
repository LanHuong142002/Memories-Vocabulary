import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
  <BrowserRouter>
    <ThemeContext.Provider value={value}>
      <Wrapper className='testing' childrenTitle={<p>Title</p>}>
        <p>Wrapper body</p>
      </Wrapper>
    </ThemeContext.Provider>
  </BrowserRouter>
);

describe('Test Wrapper component', () => {
  it('Should render Wrapper component', () => {
    const { container } = render(<WrapperComponent />);

    expect(container).toBeInTheDocument();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    jest.spyOn(reactRouter, 'useLocation').mockReturnValue(mockLocation);
    const { getByRole } = render(<WrapperComponent />);

    const button = getByRole('button');
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    // Click checkbox and click button redirect to home page
    fireEvent.click(checkbox);
    fireEvent.click(button);

    expect(checkbox.checked).toBe(true);
    expect(handleToggleTheme).toHaveBeenCalled();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    jest.spyOn(reactRouter, 'useLocation').mockReturnValue(mockLocation);
    const { getByRole, getByText } = render(
      <WrapperComponent value={{ ...mockThemeContext, theme: 'dark' }} />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(getByText('Back to Home').closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });

  it('Should render notification when have any error from topics', () => {
    const { getByText } = render(
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
    const { getByText } = render(
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
