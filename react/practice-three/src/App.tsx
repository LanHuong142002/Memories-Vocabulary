import { Suspense, lazy } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// Components
import { Button, NotificationModal, Spinner, ErrorBoundary } from '@components';
import { HomePage } from '@pages';

// Styles
import './styles/main.css';

const DetailsPage = lazy(() => import('../src/pages/DetailsPage'));

const App = () => {
  const navigate = useNavigate();

  /**
   * @description function redirect to home page of modal
   * error boundary
   */
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className='container'>
      <Routes>
        <Route
          path='/'
          element={
            <ErrorBoundary
              fallback={
                <NotificationModal
                  url='/icons/trash-icon.svg'
                  title='Ooops!'
                  description={'Something went wrong.'}
                />
              }
            >
              <HomePage />
            </ErrorBoundary>
          }
        />
        <Route
          path='/details/:id'
          element={
            <ErrorBoundary
              fallback={
                <NotificationModal
                  url='/icons/trash-icon.svg'
                  title='Ooops!'
                  description={'Something went wrong. Click close button to redirect to home page'}
                  onCancel={handleCancel}
                >
                  <Button
                    label='Close'
                    variant='tertiary'
                    color='warning'
                    size='lg'
                    onClick={handleCancel}
                  />
                </NotificationModal>
              }
            >
              <Suspense fallback={<Spinner />}>
                <DetailsPage />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
