import { ReactElement, ReactNode, memo } from 'react';
// Styles
import './index.css';
interface TableCellProps {
  hasBorder?: boolean;
  rowspan?: number;
  colspan?: number;
  tagName?: 'th' | 'td';
  color?: 'success' | 'failed';
  children?: ReactNode;
}
export const TableCell = memo(
  ({
    hasBorder = false,
    rowspan,
    colspan,
    children,
    tagName = 'td',
    color,
  }: TableCellProps): ReactElement => {
    const TagName = tagName;
    return (
      <TagName
        className={`table-cell table-cell-${color ? color : ''} ${
          hasBorder ? 'table-cell-border' : ''
        }`}
        data-testid='table-cell'
        rowSpan={rowspan}
        colSpan={colspan}
      >
        {children}
      </TagName>
    );
  },
);
