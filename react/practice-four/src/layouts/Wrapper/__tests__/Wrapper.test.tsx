import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Contexts
import { ThemeContext, ThemeProviderProps } from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Components
import { Wrapper } from '@layouts';

const handleToggleTheme = jest.fn();

const mockThemeContext = {
  theme: 'light',
  onToggleTheme: handleToggleTheme,
} as ThemeProviderProps;

const HomePageComponent = () => (
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
    const { container } = render(<HomePageComponent />);

    expect(container).toBeInTheDocument();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    const { getByRole } = render(<HomePageComponent />);

    const button = getByRole('button');
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    fireEvent.click(button);

    expect(checkbox.checked).toBe(true);
    expect(handleToggleTheme).toHaveBeenCalled();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    const { getByRole, getByText } = render(<HomePageComponent />);

    const button = getByRole('button');

    fireEvent.click(button);

    expect(getByText('Back to Home').closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });
});
