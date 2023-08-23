import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Components
import { ThemeProvider } from '@contexts';

import { App } from './App';

jest.mock('@routes', () => ({
  Routers: [
    {
      path: '/route1',
      element: <div>Route 1</div>,
    },
    {
      path: '/route2',
      element: <div>Route 2</div>,
    },
  ],
}));

describe('App', () => {
  it('renders the App component with routes', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/route1']}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const routeContent = getByText('Route 1');
    expect(routeContent).toBeInTheDocument();
  });
});
