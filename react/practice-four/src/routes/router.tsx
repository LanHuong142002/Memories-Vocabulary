import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Pages
const HomePage = lazy(() => import('@pages/HomePage'));
const VocabularyPage = lazy(() => import('@pages/VocabularyPage'));

export const Routers: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: `${ROUTES.TESTING}/:id`,
    element: <VocabularyPage />,
  },
];
