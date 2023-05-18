import { Route, Routes } from 'react-router-dom';

// Styles
import './styles/main.css';

// Pages
import { HomePage } from '@pages';
import { Suspense, lazy } from 'react';

const DetailsPage = lazy(() => import('../src/pages/DetailsPage'));

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Suspense>
          <Route path='/details/:id' element={<DetailsPage />} />
        </Suspense>
      </Routes>
    </div>
  );
};

export default App;
