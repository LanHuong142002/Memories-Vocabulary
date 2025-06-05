import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableProps {
  children: ReactNode;
}

export const Table = ({ children }: TableProps): ReactElement => (
  <table className='table-wrapper'>{children}</table>
);
