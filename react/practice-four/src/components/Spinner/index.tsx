import { ReactElement, memo } from 'react';

// Constants
import { SPINNER_SIZE, SPINNER_VARIANT } from '@constants';

// Styles
import './index.css';

interface SpinnerType {
  variant?: SPINNER_VARIANT;
  size?: SPINNER_SIZE;
}

const Spinner = memo(
  ({ variant, size = SPINNER_SIZE.M }: SpinnerType): ReactElement => (
    <div className={`spinner-wrapper${variant ? `-${variant}` : ''} spinner spinner-${size}`} />
  ),
);

export default Spinner;
