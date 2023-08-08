import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableHeaderProps {
  children: ReactNode;
}

export const TableHeader = memo(
  ({ children }: TableHeaderProps): ReactElement => (
    <thead className='table-header' data-testid='table-header'>
      {children}
    </thead>
  ),
);
