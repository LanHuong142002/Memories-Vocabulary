import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableRowProps {
  children: ReactNode;
  classTableRow?: 'header' | 'message';
}

const TableRow = ({ children, classTableRow }: TableRowProps): ReactElement => (
  <tr className={`table-row ${classTableRow ? `table-row-${classTableRow}` : ''}`}>{children}</tr>
);

export default TableRow;
