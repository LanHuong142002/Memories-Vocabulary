import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Contexts
import { TopicProvider, VocabularyProvider } from '@contexts';

// Pages
const Home = lazy(() => import('@pages/Home'));
const Vocabulary = lazy(() => import('@pages/Vocabulary'));
const Testing = lazy(() => import('@pages/Testing'));
const Result = lazy(() => import('@pages/Result'));

export const Routers: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: (
      <TopicProvider>
        <Home />
      </TopicProvider>
    ),
  },
  {
    path: `${ROUTES.VOCABULARY}/:id`,
    element: (
      <VocabularyProvider>
        <Vocabulary />
      </VocabularyProvider>
    ),
  },
  {
    path: `${ROUTES.TESTING}/:id`,
    element: (
      <VocabularyProvider>
        <Testing />
      </VocabularyProvider>
    ),
  },
  {
    path: `${ROUTES.RESULT}/:id`,
    element: (
      <VocabularyProvider>
        <Result />
      </VocabularyProvider>
    ),
  },
];
