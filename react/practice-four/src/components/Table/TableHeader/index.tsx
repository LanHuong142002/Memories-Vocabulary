import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader = memo(
  ({ children }: TableHeaderProps): ReactElement => (
    <thead className='table-header' data-testid='table-header'>
      {children}
    </thead>
  ),
);

export default TableHeader;
