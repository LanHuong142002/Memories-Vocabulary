import { Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

// Contexts
import { ThemeContext } from '@contexts';

// Contexts
import { TopicProvider, VocabularyProvider } from '@contexts';

// Routes
import { Routers } from '@routes';

// Constants
import { SPINNER_VARIANT } from '@constants';

// Components
import { Spinner } from '@components';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`container ${theme}`}>
      <TopicProvider>
        <VocabularyProvider>
          <Suspense fallback={<Spinner variant={SPINNER_VARIANT.PRIMARY} />}>
            <Routes>
              {Routers.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </Suspense>
        </VocabularyProvider>
      </TopicProvider>
    </main>
  );
};
