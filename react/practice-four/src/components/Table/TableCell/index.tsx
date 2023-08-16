import { ReactElement, ReactNode, memo } from 'react';
// Styles
import './index.css';
interface TableCellProps {
  rowspan?: number;
  colspan?: number;
  className?: string;
  tagName?: 'th' | 'td';
  color?: 'success' | 'failed';
  children?: ReactNode;
}

const TableCell = memo(
  ({
    rowspan,
    colspan,
    className,
    color,
    tagName: TagName = 'td',
    children,
  }: TableCellProps): ReactElement => (
    <TagName
      className={`table-cell table-cell-${color ? color : ''} ${className ? className : ''}`}
      data-testid='table-cell'
      rowSpan={rowspan}
      colSpan={colspan}
    >
      {children}
    </TagName>
  ),
);

export default TableCell;
