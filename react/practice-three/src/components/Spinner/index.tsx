import { ReactElement } from 'react';

// Styles
import './index.css';

const Spinner = (): ReactElement => (
  <div className='spinner-wrapper'>
    <div className='spinner'></div>
  </div>
);

export default Spinner;
