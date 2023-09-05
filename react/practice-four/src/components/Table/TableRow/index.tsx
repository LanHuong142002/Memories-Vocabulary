import { ReactElement, ReactNode, memo } from 'react';

// Constants
import { TABLE_ROW_SIZE } from '@constants';

// Styles
import './index.css';

interface TableRowProps {
  children: ReactNode;
  size?: TABLE_ROW_SIZE;
}

const TableRow = memo(
  ({ children, size = TABLE_ROW_SIZE.M }: TableRowProps): ReactElement => (
    <tr className={`table-row table-row-${size}`}>{children}</tr>
  ),
);

export default TableRow;
