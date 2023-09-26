import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, TopicProvider, VocabularyProvider } from '@contexts';
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

export const renderWithProvider = (children: ReactNode) => {
  return renderWithThemeProvider(
    <TopicProvider>
      <VocabularyProvider>{children}</VocabularyProvider>
    </TopicProvider>,
  );
};

export * from '@testing-library/react';
