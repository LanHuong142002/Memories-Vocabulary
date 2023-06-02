import { ReactElement, forwardRef } from 'react';

// Components
import { Button } from '@components';

// Styles
import './index.css';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(function ActionMenu(
  { onDelete, onEdit },
  ref,
): ReactElement {
  return (
    <div className='action-menu-wrapper' ref={ref} data-testid='action-menu'>
      <Button label='Edit' color='default' type='button' onClick={onEdit} variant='primary' />
      <Button label='Delete' color='warning' type='button' onClick={onDelete} variant='primary' />
    </div>
  );
});
