import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableProps {
  hasBorderCell?: boolean;
  theme?: 'light' | 'dark';
  children: ReactNode;
}

const Table = memo(
  ({ hasBorderCell = false, children, theme = 'light' }: TableProps): ReactElement => (
    <table
      className={`table-wrapper table-wrapper-${theme} ${hasBorderCell ? 'table-cell-border' : ''}`}
    >
      {children}
    </table>
  ),
);

export default Table;
