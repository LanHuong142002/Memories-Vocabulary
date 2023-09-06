import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Contexts
import { ThemeProvider } from '@contexts';

// Constants
import { SPINNER_VARIANT } from '@constants';

// Components
import { App } from '@App';
import { ErrorBoundary, Spinner } from '@components';
import { Error } from '@pages';

// Styles
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Spinner variant={SPINNER_VARIANT.PRIMARY} />}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Suspense>
      </ErrorBoundary>
    </Router>
  </StrictMode>,
);
