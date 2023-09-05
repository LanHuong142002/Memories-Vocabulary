import { ReactElement, ReactNode, memo } from 'react';

// Constants
import { TABLE_CELL_COLOR } from '@constants';

// Styles
import './index.css';

interface TableCellProps {
  className?: string;
  color?: TABLE_CELL_COLOR;
  children?: ReactNode;
}

const TableCell = memo(
  ({ className, color, children }: TableCellProps): ReactElement => (
    <div
      className={`cell ${color ? `cell-status cell-${color}` : ''} ${className ? className : ''}`}
      data-testid='table-cell'
    >
      {children}
    </div>
  ),
);

export default TableCell;
