import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableHeaderProps {
  children: ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps): ReactElement => (
  <thead className='table-header' data-testid='table-header'>
    {children}
  </thead>
);
