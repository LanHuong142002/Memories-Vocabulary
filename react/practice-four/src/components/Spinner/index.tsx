import { ReactElement, memo } from 'react';

// Constants
import { SIZE, VARIANT } from '@constants';

// Styles
import './index.css';

interface SpinnerType {
  variant?: VARIANT.PRIMARY;
  size?: SIZE.M | SIZE.S;
}

const Spinner = memo(
  ({ variant, size = SIZE.M }: SpinnerType): ReactElement => (
    <div className={`spinner-wrapper${variant ? `-${variant}` : ''} spinner spinner-${size}`} />
  ),
);

export default Spinner;
