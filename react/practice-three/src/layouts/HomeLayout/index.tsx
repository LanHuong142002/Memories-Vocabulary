import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

export const HomeLayout = ({
  children,
  header,
}: {
  header: ReactElement;
  children: ReactNode;
}): ReactElement => (
  <main className='home-wrapper'>
    <div className='home-header'>{header}</div>
    <div className='home-body'>{children}</div>
  </main>
);
