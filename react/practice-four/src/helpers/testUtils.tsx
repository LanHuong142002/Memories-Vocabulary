import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const renderWithThemeProvider = (children: ReactNode) => {
  const queryClient = new QueryClient();

  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>,
  );
};

export const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export * from '@testing-library/react';
