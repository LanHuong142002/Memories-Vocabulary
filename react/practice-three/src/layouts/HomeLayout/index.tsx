import { ReactElement, memo } from 'react';

// Styles
import './index.css';

const HomeLayout = ({
  homeBody,
  homeHeader,
}: {
  homeBody: ReactElement;
  homeHeader: ReactElement;
}) => {
  return (
    <main className='home-wrapper'>
      <div className='home-header'>{homeHeader}</div>
      <div className='home-body'>{homeBody}</div>
    </main>
  );
};

export default memo(HomeLayout);
