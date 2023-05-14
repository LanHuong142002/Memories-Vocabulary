// Styles
import './index.css';

// Components
import { Typography } from '@components';

const Header = () => {
  return (
    <header className='header-wrapper'>
      <Typography text='Management' tagName='h1' weight='bold' color='quaternary' size='xl' />
    </header>
  );
};

export default Header;
