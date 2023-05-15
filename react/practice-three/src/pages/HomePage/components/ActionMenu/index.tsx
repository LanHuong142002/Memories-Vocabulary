import { forwardRef } from 'react';

// Styles
import './index.css';

// Components
import { Button } from '@components';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(function ActionMenu(
  { onDelete, onEdit },
  ref,
) {
  return (
    <div className='action-menu-wrapper' ref={ref}>
      <Button label='Edit' color='default' type='button' onClick={onEdit} variant='primary' />
      <Button label='Delete' color='warning' type='button' onClick={onDelete} variant='primary' />
    </div>
  );
});

export default ActionMenu;
