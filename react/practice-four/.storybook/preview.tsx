import React from 'react';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import { MantineProvider } from '@mantine/core';

// Themes
import { defaultTheme } from '../src/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ThemeWrapper = (props: { children: React.ReactNode }) => (
  <MantineProvider
    theme={{ ...defaultTheme, colorScheme: useDarkMode() ? 'dark' : 'light' }}
    withGlobalStyles
    withNormalizeCSS
  >
    {props.children}
  </MantineProvider>
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      dark: { ...themes.normal },
      light: { ...themes.normal },
    },
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();

      return (
        <QueryClientProvider client={queryClient}>
          <ThemeWrapper>
            <div style={{ margin: '10px' }}>
              <Story />
            </div>
          </ThemeWrapper>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
