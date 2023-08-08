// Components
import { Typography } from '@components';

// Styles
import './index.css';

export const ErrorPage = () => (
  <div className='container'>
    <div className='error-content'>
      <Typography size='xxl'>404</Typography>
      <Typography color='secondary' size='l'>
        Something went wrong!
      </Typography>
    </div>
  </div>
);
