import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableCellProps {
  title?: string;
  tagName?: 'th' | 'td';
  children?: ReactNode;
}

export const TableCell = ({ children, title, tagName = 'td' }: TableCellProps): ReactElement => {
  const TagName = tagName;

  return (
    <TagName className='table-cell' data-testid='table-cell'>
      {title && <p className='title'>{title}</p>}
      {children}
    </TagName>
  );
};
