import { Suspense } from 'react';
import { Container } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';

// Routes
import { Routers } from '@routes';

// Constants
import { SPINNER_VARIANT } from '@constants';

// Components
import { Spinner } from '@components';

export const App = () => (
  <Container sx={{ maxWidth: '100%' }}>
    <Suspense fallback={<Spinner variant={SPINNER_VARIANT.PRIMARY} />}>
      <Routes>
        {Routers.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  </Container>
);
