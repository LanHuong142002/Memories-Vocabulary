// Components
import { Typography } from '@components';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_VARIANT } from '@constants';

const Error = () => (
  <div className='container'>
    <div className='error-content'>
      <Typography size={TYPOGRAPHY_SIZE.XXL}>404</Typography>
      <Typography color={TYPOGRAPHY_VARIANT.SECONDARY} size={TYPOGRAPHY_SIZE.L}>
        Something went wrong!
      </Typography>
    </div>
  </div>
);

export default Error;
