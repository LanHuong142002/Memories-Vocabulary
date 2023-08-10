import { Spinner } from '@components';
import { Routers } from '@routes';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

export const App = () => (
  <main className='container'>
    <Suspense fallback={<Spinner variant='primary' />}>
      <Routes>
        {Routers.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  </main>
);
