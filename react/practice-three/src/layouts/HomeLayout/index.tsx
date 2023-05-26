import { ReactElement } from 'react';

// Styles
import './index.css';

export const HomeLayout = ({
  homeBody,
  homeHeader,
}: {
  homeBody: ReactElement;
  homeHeader: ReactElement;
}) => (
  <main className='home-wrapper'>
    <div className='home-header'>{homeHeader}</div>
    <div className='home-body'>{homeBody}</div>
  </main>
);
