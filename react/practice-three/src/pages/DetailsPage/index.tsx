import { useNavigate } from 'react-router-dom';

// Helpers
import { ErrorBoundary } from '@helpers';

// Layouts
import { DetailsLayout } from '@layouts';

// Layouts
import { Button, NotificationModal } from '@components';

const DetailsPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  return (
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
      <DetailsLayout />
    </ErrorBoundary>
  );
};

export default DetailsPage;
