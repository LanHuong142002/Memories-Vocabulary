import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableCellProps {
  tagName?: 'th' | 'td';
  children?: ReactNode;
}

export const TableCell = memo(({ children, tagName = 'td' }: TableCellProps): ReactElement => {
  const TagName = tagName;

  return (
    <TagName className='table-cell' data-testid='table-cell'>
      {children}
    </TagName>
  );
});
