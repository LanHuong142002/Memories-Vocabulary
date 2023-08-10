import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableProps {
  hasBorderCell?: boolean;
  children: ReactNode;
}

const Table = memo(
  ({ hasBorderCell = false, children }: TableProps): ReactElement => (
    <table className={`table-wrapper ${hasBorderCell ? 'table-cell-border' : ''}`}>
      {children}
    </table>
  ),
);

export default Table;
