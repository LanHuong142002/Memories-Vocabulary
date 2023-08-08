import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// Contexts
import { ThemeProvider } from '@contexts';

// Components
import { App } from '@App';
import { ErrorBoundary } from '@components';
import { ErrorPage } from '@pages';

// Styles
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ErrorBoundary fallback={<ErrorPage />}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  </StrictMode>,
);
