import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableProps {
  className?: string;
  childrenHeader: ReactElement;
  children: ReactNode;
}

const Table = ({ className, childrenHeader, children }: TableProps): ReactElement => (
  <div className={`table ${className || ''}`}>
    <div className='table-header' data-testid='table-header'>
      {childrenHeader}
    </div>
    <div className='table-body' data-testid='table-body'>
      {children}
    </div>
  </div>
);

export default Table;
