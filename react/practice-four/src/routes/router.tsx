import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Pages
const HomePage = lazy(() => import('@pages/HomePage'));
const VocabularyPage = lazy(() => import('@pages/VocabularyPage'));
const TestingPage = lazy(() => import('@pages/TestingPage'));
const ResultPage = lazy(() => import('@pages/ResultPage'));

export const Routers: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: `${ROUTES.VOCABULARY}/:id`,
    element: <VocabularyPage />,
  },
  {
    path: `${ROUTES.TESTING}/:id`,
    element: <TestingPage />,
  },
  {
    path: `${ROUTES.RESULT}/:id`,
    element: <ResultPage />,
  },
];
