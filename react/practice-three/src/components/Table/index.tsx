import { ReactNode } from 'react';

// Styles
import './index.css';

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps): React.ReactElement => (
  <table className='table-wrapper'>{children}</table>
);

export default Table;
