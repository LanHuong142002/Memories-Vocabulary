import { Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// Contexts
import { ThemeContext } from '@contexts';

// Routes
import { Routers } from '@routes';

// Components
import { Spinner } from '@components';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`container ${theme}`}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {Routers.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </main>
  );
};
