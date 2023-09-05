import { ReactElement, ReactNode, memo } from 'react';

const TableRow = memo(
  ({ children }: { children: ReactNode }): ReactElement => (
    <div className='row' data-testid='table-row'>
      {children}
    </div>
  ),
);

export default TableRow;
