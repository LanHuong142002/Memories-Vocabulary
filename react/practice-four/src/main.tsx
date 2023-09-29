import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Contexts
import { ThemeProvider } from '@contexts';

// Components
import { App } from '@App';
import { GlobalFonts, ErrorBoundary } from '@components';
import { Error } from '@pages';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <GlobalFonts />
        <ErrorBoundary fallback={<Error />}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </Router>
  </StrictMode>,
);
