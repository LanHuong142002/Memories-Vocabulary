import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Flex, Loader } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Routes
import { Routers } from '@routes';

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <Container sx={{ maxWidth: '100%' }}>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <Flex justify='center' align='center' h='100vh'>
              <Loader color='dark' size='md' />
            </Flex>
          }
        >
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
