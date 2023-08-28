import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Contexts
import { ThemeProvider } from '@contexts';

// Components
import { App } from '@App';
import { ErrorBoundary } from '@components';
import { Error } from '@pages';

// Styles
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ErrorBoundary fallback={<Error />}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  </StrictMode>,
);
