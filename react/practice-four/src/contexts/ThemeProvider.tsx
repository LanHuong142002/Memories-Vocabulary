import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

// Helpers
import { getItems, setItems } from '@helpers';

// Themes
import { defaultTheme } from '@themes';

// Constants
import { STORAGE_KEYS } from '@constants';

export interface ThemeProviderProps {
  theme: 'light' | 'dark';
  onToggleTheme: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeProviderProps>({} as ThemeProviderProps);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  /**
   * @description function set toggle theme with value from checkbox
   *
   * @param {boolean} value is value of checkbox
   */
  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => {
      const themeColor = colorScheme === 'dark' ? 'light' : 'dark';
      setItems(STORAGE_KEYS.THEME, themeColor);
      setColorScheme(value || themeColor);
    },
    [colorScheme],
  );

  const initialize = () => {
    const themeColor = getItems<'light' | 'dark'>(STORAGE_KEYS.THEME);
    setIsInitialized(true);

    if (themeColor) {
      setColorScheme(themeColor);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  const theme = useMemo(
    () => ({
      colorScheme,
      ...defaultTheme,
    }),
    [colorScheme],
  );

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS withCSSVariables>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
