import { ReactElement, ReactNode, memo } from 'react';
// Styles
import './index.css';
interface TableCellProps {
  rowspan?: number;
  colspan?: number;
  tagName?: 'th' | 'td';
  color?: 'success' | 'failed';
  children?: ReactNode;
}

const TableCell = memo(
  ({
    rowspan,
    colspan,
    children,
    tagName: TagName = 'td',
    color,
  }: TableCellProps): ReactElement => (
    <TagName
      className={`table-cell table-cell-${color ? color : ''}`}
      data-testid='table-cell'
      rowSpan={rowspan}
      colSpan={colspan}
    >
      {children}
    </TagName>
  ),
);

export default TableCell;
