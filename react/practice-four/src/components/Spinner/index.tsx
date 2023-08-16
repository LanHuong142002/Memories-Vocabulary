import { ReactElement, memo } from 'react';

// Styles
import './index.css';

const Spinner = memo(
  ({ variant, size = 'm' }: { variant?: 'primary'; size?: 'm' | 's' }): ReactElement => (
    <div className={`spinner-wrapper${variant ? `-${variant}` : ''} spinner spinner-${size}`}>
      <div className='spinner' />
    </div>
  ),
);

export default Spinner;
