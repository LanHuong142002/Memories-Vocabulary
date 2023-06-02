import { ReactElement, forwardRef, memo } from 'react';

// Styles
import './index.css';

// Components
import { Button } from '@components';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionMenu = memo(
  forwardRef<HTMLDivElement, ActionMenuProps>(function ActionMenu(
    { onDelete, onEdit },
    ref,
  ): ReactElement {
    return (
      <div className='action-menu-wrapper' ref={ref} data-testid='action-menu'>
        <Button label='Edit' color='default' type='button' onClick={onEdit} variant='primary' />
        <Button label='Delete' color='warning' type='button' onClick={onDelete} variant='primary' />
      </div>
    );
  }),
);
