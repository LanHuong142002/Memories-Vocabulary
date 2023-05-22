// Helpers
import { ErrorBoundary } from '@helpers';

// Layouts
import { Header, HomeLayout } from '@layouts';

// Components
import { Button, NotificationModal } from '@components';

const HomePage = () => {
  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <>
      <Header />
      <ErrorBoundary
        fallback={
          <NotificationModal
            url='/icons/trash-icon.svg'
            title='Ooops!'
            description={'Something went wrong.'}
            onCancel={handleCancel}
          >
            <Button label='Close' variant='tertiary' color='warning' size='lg' />
          </NotificationModal>
        }
      >
        <HomeLayout />
      </ErrorBoundary>
    </>
  );
};

export default HomePage;
