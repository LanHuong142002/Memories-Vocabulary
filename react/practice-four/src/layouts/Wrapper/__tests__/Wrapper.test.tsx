import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Contexts
import { DictionaryContext, DictionaryType, ThemeContext, ThemeProviderProps } from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Components
import { Wrapper } from '@layouts';

const handleToggleTheme = jest.fn();
jest.useFakeTimers();

const mockThemeContext = {
  theme: 'light',
  onToggleTheme: handleToggleTheme,
} as ThemeProviderProps;

const WrapperComponent = () => (
  <BrowserRouter>
    <ThemeContext.Provider value={mockThemeContext}>
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
    const { getByRole } = render(<WrapperComponent />);

    const button = getByRole('button');
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    fireEvent.click(button);

    expect(checkbox.checked).toBe(true);
    expect(handleToggleTheme).toHaveBeenCalled();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    const { getByRole, getByText } = render(
      <BrowserRouter>
        <ThemeContext.Provider value={{ ...mockThemeContext, theme: 'dark' }}>
          <Wrapper className='testing' childrenTitle={<p>Title</p>}>
            <p>Wrapper body</p>
          </Wrapper>
        </ThemeContext.Provider>
      </BrowserRouter>,
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(getByText('Back to Home').closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });

  it('Should render notification when have any error from topics', () => {
    const { getByText } = render(
      <DictionaryContext.Provider value={{ errorsTopic: 'Error' } as DictionaryType}>
        <WrapperComponent />
      </DictionaryContext.Provider>,
    );

    act(() => {
      jest.runAllTimers();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });

  it('Should render notification when have any error from vocabulary', () => {
    const { getByText } = render(
      <DictionaryContext.Provider value={{ errorsVocabulary: 'Error' } as DictionaryType}>
        <WrapperComponent />
      </DictionaryContext.Provider>,
    );

    act(() => {
      jest.runAllTimers();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });
});
