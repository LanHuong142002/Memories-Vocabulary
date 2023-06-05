import { ReactElement, memo } from 'react';

// Components
import { Typography } from '@components';

// Styles
import './index.css';

export const Header = memo(
  (): ReactElement => (
    <header className='header-wrapper'>
      <Typography text='Management' tagName='h1' weight='bold' color='quaternary' size='xl' />
    </header>
  ),
);
