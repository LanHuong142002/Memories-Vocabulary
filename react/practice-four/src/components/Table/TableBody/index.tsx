import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableBodyProps {
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps): ReactElement => (
  <tbody className='table-body'>{children}</tbody>
);
