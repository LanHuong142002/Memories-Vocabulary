import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableRowProps {
  children: ReactNode;
  size?: 's' | 'm';
}

const TableRow = memo(
  ({ children, size = 'm' }: TableRowProps): ReactElement => (
    <tr className={`table-row table-row-${size}`}>{children}</tr>
  ),
);

export default TableRow;
