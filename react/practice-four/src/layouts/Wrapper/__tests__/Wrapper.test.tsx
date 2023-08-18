import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

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

const MockProvider = ({
  children,
  value = mockThemeContext,
}: {
  children: ReactNode;
  value?: ThemeProviderProps;
}) => (
  <BrowserRouter>
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  </BrowserRouter>
);

describe('Test Wrapper component', () => {
  it('Should render Wrapper component', () => {
    const { container } = render(
      <MockProvider>
        <Wrapper className='testing' childrenTitle={<p>Title</p>}>
          <p>Wrapper body</p>
        </Wrapper>
      </MockProvider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    const { getByRole } = render(
      <MockProvider>
        <Wrapper className='testing' childrenTitle={<p>Title</p>}>
          <p>Wrapper body</p>
        </Wrapper>
      </MockProvider>,
    );

    const button = getByRole('button');
    const checkbox = getByRole('checkbox') as HTMLInputElement;

    fireEvent.click(checkbox);
    fireEvent.click(button);

    expect(checkbox.checked).toBe(true);
    expect(handleToggleTheme).toHaveBeenCalled();
  });

  it('Should call handleToggleTheme when click checkbox to change theme', () => {
    const { getByRole, getByText } = render(
      <MockProvider>
        <Wrapper className='testing' childrenTitle={<p>Title</p>}>
          <p>Wrapper body</p>
        </Wrapper>
      </MockProvider>,
    );

    const button = getByRole('button');

    fireEvent.click(button);

    expect(getByText('Back to Home').closest('a')).toHaveAttribute('href', ROUTES.HOME);
  });
});
