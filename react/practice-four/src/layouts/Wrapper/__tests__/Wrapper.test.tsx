import { act } from '@testing-library/react';
import * as reactRouter from 'react-router-dom';
import * as stores from '@stores';

// Contexts
import { ThemeContext, ThemeProviderProps } from '@contexts';

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
jest.mock('@stores', () => ({
  ...jest.requireActual('@stores'),
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

  it('Should render notification when have any error', () => {
    jest.spyOn(stores, 'useNotificationStores').mockImplementation(() => ({
      messageError: 'Error',
      notification: true,
      setNotification: jest.fn(),
      setMessageError: jest.fn(),
    }));
    const { getByText } = renderWithThemeProvider(<WrapperComponent />);

    act(() => {
      jest.runAllTimers();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });
});
