import { forwardRef, useCallback, useContext } from 'react';

// Styles
import './index.css';

// Components
import { Button } from '@components';

// Context
import { ModalContext } from '@contexts';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(function ActionMenu(
  { onDelete, onEdit },
  ref,
) {
  const { showHideNotificationModal } = useContext(ModalContext);

  /**
   * @description function handle action delete button
   */
  const handleDelete = useCallback(() => {
    showHideNotificationModal();
    onDelete();
  }, [onDelete]);

  return (
    <div className='action-menu-wrapper' ref={ref}>
      <Button label='Edit' color='default' type='button' onClick={onEdit} variant='primary' />
      <Button
        label='Delete'
        color='warning'
        type='button'
        onClick={handleDelete}
        variant='primary'
      />
    </div>
  );
});

export default ActionMenu;
