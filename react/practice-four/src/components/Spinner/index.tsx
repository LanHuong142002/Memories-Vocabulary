import { ReactElement, memo } from 'react';

// Styles
import './index.css';

const Spinner = memo(
  (): ReactElement => (
    <div className='spinner-wrapper'>
      <div className='spinner'></div>
    </div>
  ),
);

export default Spinner;
