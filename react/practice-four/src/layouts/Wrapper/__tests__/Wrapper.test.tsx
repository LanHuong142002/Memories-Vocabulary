import { act } from '@testing-library/react';
import * as stores from '@stores';

// Contexts
import { ThemeContext, ThemeProviderProps } from '@contexts';

// Components
import { Wrapper } from '@layouts';

// Helpers
import { renderWithThemeProvider } from '@helpers';

jest.useFakeTimers();
jest.mock('@stores', () => ({
  ...jest.requireActual('@stores'),
}));

const handleToggleTheme = jest.fn();

const mockThemeContext = {
  theme: 'light',
  onToggleTheme: handleToggleTheme,
} as ThemeProviderProps;

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

  it('Should render notification when have any error', () => {
    jest.spyOn(stores, 'useNotificationStores').mockImplementation(() => ({
      messageError: 'Error',
      notification: true,
      setNotification: jest.fn(),
    }));
    const { getByText } = renderWithThemeProvider(<WrapperComponent />);

    act(() => {
      jest.runAllTimers();
      expect(getByText('Error')).toBeInTheDocument();
    });
  });
});
