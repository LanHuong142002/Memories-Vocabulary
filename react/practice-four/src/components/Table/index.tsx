import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableProps {
  hasBorderCell?: boolean;
  className: string;
  children: ReactNode;
}

const Table = memo(
  ({ hasBorderCell = false, className, children }: TableProps): ReactElement => (
    <table
      className={`table-wrapper table-wrapper-${className} ${
        hasBorderCell ? 'table-cell-border' : ''
      }`}
    >
      {children}
    </table>
  ),
);

export default Table;
