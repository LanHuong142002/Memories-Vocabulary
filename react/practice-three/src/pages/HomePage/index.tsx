// Contexts
import { ModalProvider } from '@contexts';

// Layouts
import { Header, HomeLayout } from '@layouts';
import { ErrorBoundary } from '@helpers';
import { Button, ModalNotification } from '@components';

const HomePage = () => {
  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <>
      <Header />
      <ModalProvider>
        <ErrorBoundary
          fallback={
            <ModalNotification
              url='/icons/trash-icon.svg'
              title='Ooops!'
              description={'Something went wrong.'}
              onCancel={handleCancel}
            >
              <Button label='Close' variant='tertiary' color='warning' size='lg' />
            </ModalNotification>
          }
        >
          <HomeLayout />
        </ErrorBoundary>
      </ModalProvider>
    </>
  );
};

export default HomePage;
