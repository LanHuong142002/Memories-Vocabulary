import { ReactElement, ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TableProps {
  theme?: 'light' | 'dark';
  children: ReactNode;
}

export const Table = memo(
  ({ children, theme = 'light' }: TableProps): ReactElement => (
    <table className={`table-wrapper table-wrapper-${theme}`}>{children}</table>
  ),
);
