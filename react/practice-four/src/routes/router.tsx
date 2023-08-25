import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Pages
const Home = lazy(() => import('@pages/Home'));
const Vocabulary = lazy(() => import('@pages/Vocabulary'));
const Testing = lazy(() => import('@pages/Testing'));
const Result = lazy(() => import('@pages/Result'));

export const Routers: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: `${ROUTES.VOCABULARY}/:id`,
    element: <Vocabulary />,
  },
  {
    path: `${ROUTES.TESTING}/:id`,
    element: <Testing />,
  },
  {
    path: `${ROUTES.RESULT}/:id`,
    element: <Result />,
  },
];
