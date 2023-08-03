import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableRowProps {
  children: ReactNode;
  variant?: 'primary';
}

export const TableRow = memo(
  ({ children, variant = 'primary' }: TableRowProps): ReactElement => (
    <tr className={`table-row table-row-${variant}`}>{children}</tr>
  ),
);
