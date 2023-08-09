import { ReactElement, memo } from 'react';

// Styles
import './index.css';

const Spinner = memo(
  ({ variant }: { variant?: 'primary' }): ReactElement => (
    <div className={`spinner-wrapper${variant ? `-${variant}` : ''}`}>
      <div className='spinner' />
    </div>
  ),
);

export default Spinner;
