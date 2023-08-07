import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableCellProps {
  tagName?: 'th' | 'td';
  children?: ReactNode;
  color?: 'success' | 'failed';
}

export const TableCell = memo(
  ({ children, tagName: TagName = 'td', color }: TableCellProps): ReactElement => (
    <TagName className={`table-cell table-cell-${color ? color : ''}`} data-testid='table-cell'>
      {children}
    </TagName>
  ),
);
