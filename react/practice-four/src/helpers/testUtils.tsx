import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, TopicProvider, VocabularyProvider } from '@contexts';

export const renderWithThemeProvider = (children: ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
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
