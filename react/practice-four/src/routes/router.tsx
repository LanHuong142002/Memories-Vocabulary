import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Pages
const HomePage = lazy(() => import('@pages').then((module) => ({ default: module.HomePage })));
const TestingPage = lazy(() =>
  import('@pages').then((module) => ({ default: module.TestingPage })),
);

export const Routers: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.TESTING,
    element: <TestingPage />,
  },
];
