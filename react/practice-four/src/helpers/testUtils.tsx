import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, TopicProvider, VocabularyProvider } from '@contexts';

export const customRender = (children: ReactNode) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>,
  );
};

export const customRenderProvider = (children: ReactNode) => {
  return customRender(
    <TopicProvider>
      <VocabularyProvider>{children}</VocabularyProvider>
    </TopicProvider>,
  );
};

export * from '@testing-library/react';
