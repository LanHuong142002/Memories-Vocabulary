// Helpers
import { ErrorBoundary } from '@helpers';

// Layouts
import { DetailsLayout } from '@layouts';

// Layouts
import { Button, NotificationModal } from '@components';

const DetailsPage = () => {
  const handleCancel = () => {
    console.log('cancel');
  };

  return (
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
      <DetailsLayout />
    </ErrorBoundary>
  );
};

export default DetailsPage;
