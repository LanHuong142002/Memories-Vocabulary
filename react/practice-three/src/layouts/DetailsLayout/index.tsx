import { ReactElement, ReactNode } from 'react';

// CSS
import './index.css';

export const DetailsLayout = ({
  title,
  children,
}: {
  title: ReactElement;
  children: ReactNode;
}): ReactElement => (
  <main className='details-page'>
    <div className='details-title'>{title}</div>
    <div className='details-body'>{children}</div>
  </main>
);
