import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Constants
import { ROUTES } from '@constants';

// Pages
const HomePage = lazy(() => import('@pages').then((module) => ({ default: module.HomePage })));

export const Routers: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
];
