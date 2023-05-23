import { Route, Routes } from 'react-router-dom';

// Styles
import './styles/main.css';

// Pages
import { HomePage } from '@pages';
import { Suspense, lazy } from 'react';
import { Spinner } from '@components';

const DetailsPage = lazy(() => import('../src/pages/DetailsPage'));

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/details/:id'
          element={
            <Suspense fallback={<Spinner />}>
              <DetailsPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
