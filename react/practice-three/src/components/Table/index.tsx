import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps): ReactElement => (
  <table className='table-wrapper'>{children}</table>
);

export default Table;
