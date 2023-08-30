// Components
import { Typography } from '@components';

// Constants
import { SIZE, VARIANT } from '@constants';

// Styles
import './index.css';

const Error = () => (
  <div className='container'>
    <div className='error-content'>
      <Typography size={SIZE.XXL}>404</Typography>
      <Typography color={VARIANT.SECONDARY} size={SIZE.L}>
        Something went wrong!
      </Typography>
    </div>
  </div>
);

export default Error;
