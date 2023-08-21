import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

// Utils

// Helpers
import { getItems, setItems } from '@helpers';

// Constants
import { STORAGE_KEYS } from '@constants';

export interface ThemeProviderProps {
  theme: 'light' | 'dark';
  onToggleTheme: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeProviderProps>({} as ThemeProviderProps);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleToggleTheme = useCallback((value: boolean) => {
    setTheme(value ? 'dark' : 'light');
    setItems(STORAGE_KEYS.THEME, value ? 'dark' : 'light');
  }, []);

  const initialize = useCallback(() => {
    const themeColor = getItems<string>(STORAGE_KEYS.THEME);
    setIsInitialized(true);

    if (themeColor) {
      setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  const value = useMemo(
    () => ({
      theme,
      onToggleTheme: handleToggleTheme,
    }),
    [handleToggleTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
