import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableRowProps {
  children: ReactNode;
  classTableRow?: 'header' | 'message' | 'spinner';
}

export const TableRow = ({ children, classTableRow }: TableRowProps): ReactElement => (
  <tr className={`table-row ${classTableRow ? `table-row-${classTableRow}` : ''}`}>{children}</tr>
);
