import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

const Table = memo(
  ({
    className,
    childrenHeader,
    children,
  }: {
    className?: string;
    childrenHeader: ReactElement;
    children: ReactNode;
  }): ReactElement => (
    <div className={`table ${className ? className : ''}`}>
      <div className='table-header' data-testid='table-header'>
        {childrenHeader}
      </div>
      <div className='table-body' data-testid='table-body'>
        {children}
      </div>
    </div>
  ),
);

export default Table;
