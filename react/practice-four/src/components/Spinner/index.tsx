import { ReactElement } from 'react';

// Styles
import './index.css';

export const Spinner = (): ReactElement => (
  <div className='spinner-wrapper'>
    <div className='spinner'></div>
  </div>
);
