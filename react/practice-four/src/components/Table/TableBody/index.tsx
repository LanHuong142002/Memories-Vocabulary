import { ReactElement, ReactNode, memo } from 'react';

interface TableBodyProps {
  children: ReactNode;
}

const TableBody = memo(
  ({ children }: TableBodyProps): ReactElement => <tbody className='table-body'>{children}</tbody>,
);

export default TableBody;
