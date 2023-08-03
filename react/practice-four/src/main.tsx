import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Components
import { App } from '@App';

// Styles
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
