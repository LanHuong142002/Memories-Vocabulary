import { Suspense } from 'react';
import { Container } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Routes
import { Routers } from '@routes';

// Constants
import { SPINNER_VARIANT } from '@constants';

// Components
import { Spinner } from '@components';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <Container sx={{ maxWidth: '100%' }}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner variant={SPINNER_VARIANT.PRIMARY} />}>
          <Routes>
            {Routers.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </Container>
  );
};
