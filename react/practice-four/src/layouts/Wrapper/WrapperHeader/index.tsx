import { memo } from 'react';
import { Flex } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

// Constants
import { BUTTON_SIZE, BUTTON_VARIANT, ROUTES } from '@constants';

// Components
import { Button, ToggleTheme } from '@components';

const WrapperHeader = () => {
  const location = useLocation();

  return (
    <Flex
      className='wrapper-header'
      align='center'
      justify='end'
      gap='10px'
      sx={{
        width: '100%',
        height: '70px',
        padding: '15px 30px',
        boxSizing: 'border-box',
      }}
      role='main'
    >
      <ToggleTheme />
      {location.pathname !== ROUTES.HOME && (
        <Link
          to={ROUTES.HOME}
          style={{
            height: '100%',
          }}
        >
          <Button variant={BUTTON_VARIANT.PRIMARY} size={BUTTON_SIZE.XS}>
            Back to Home
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default memo(WrapperHeader);
