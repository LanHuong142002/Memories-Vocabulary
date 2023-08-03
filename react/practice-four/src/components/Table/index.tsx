import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableProps {
  children: ReactNode;
}

export const Table = memo(
  ({ children }: TableProps): ReactElement => <table className='table-wrapper'>{children}</table>,
);
