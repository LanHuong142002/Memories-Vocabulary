import { ReactNode } from 'react';

// Styles
import './index.css';

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps): React.ReactElement => (
  <thead className='table-header' data-testid='table-header'>
    {children}
  </thead>
);

export default TableHeader;
