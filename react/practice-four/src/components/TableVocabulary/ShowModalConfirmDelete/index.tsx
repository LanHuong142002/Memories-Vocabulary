import { useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';

// Constants
import { BUTTON_SIZE, BUTTON_VARIANT } from '@constants';

// Components
import { Button, Modal } from '@components';

const ShowModalConfirmDelete = ({
  onDeleteVocabulary,
}: {
  topicId: string;
  onDeleteVocabulary: () => void;
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  /**
   * @description function delete a vocabulary
   */
  const handleDeleteVocabulary = useCallback(() => {
    onDeleteVocabulary();
    close();
  }, [close, onDeleteVocabulary]);

  return (
    <>
      <Button
        p='5px'
        variant={BUTTON_VARIANT.SECONDARY}
        onClick={open}
        data-testid='button-delete-vocabulary'
      >
        X
      </Button>

      {/* Modal */}
      <Modal
        onClose={close}
        opened={opened}
        description='Are you sure to delete this vocabulary?'
        title='Confirm Delete'
      >
        <Button
          variant={BUTTON_VARIANT.SECONDARY}
          size={BUTTON_SIZE.XS}
          onClick={close}
          sx={{ height: '35px' }}
        >
          Cancel
        </Button>
        <Button
          variant={BUTTON_VARIANT.PRIMARY}
          size={BUTTON_SIZE.XS}
          onClick={handleDeleteVocabulary}
        >
          Delete
        </Button>
      </Modal>
    </>
  );
};

export default ShowModalConfirmDelete;
