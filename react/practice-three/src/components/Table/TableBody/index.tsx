import { ReactNode } from 'react';

// Styles
import './index.css';

interface TableBodyProps {
  children: ReactNode;
}

const TableBody = ({ children }: TableBodyProps): React.ReactElement => (
  <tbody className='table-body'>{children}</tbody>
);

export default TableBody;
