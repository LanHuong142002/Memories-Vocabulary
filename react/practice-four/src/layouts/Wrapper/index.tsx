import { Box, Flex, MantineTheme, Overlay } from '@mantine/core';
import { ReactNode, useEffect } from 'react';

// Contexts
import { useNotificationStores } from '@stores';

// Helpers
import { getColorScheme } from '@helpers';

// Components
import { WrapperHeader } from '@layouts';
import { Notification } from '@components';

const Wrapper = ({
  className,
  children,
  childrenTitle,
}: {
  className: string;
  children: ReactNode;
  childrenTitle: ReactNode;
}) => {
  const { notification, messageError, setNotification } = useNotificationStores();

  useEffect(() => {
    if (messageError) {
      setNotification(true);
      const timeout = setTimeout(() => {
        setNotification(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [messageError, setNotification]);

  return (
    <Box className={`wrapper-${className}-page`}>
      <WrapperHeader />
      <Flex
        direction='column'
        justify='center'
        align='center'
        className='wrapper-container'
        sx={{
          /* 70px is height of wrapper header */
          minHeight: 'calc(100vh - 70px)',
          padding: '60px 20px',
        }}
      >
        <Flex
          direction='column'
          align='center'
          className='wrapper-box'
          sx={(theme: MantineTheme) => ({
            width: '100%',
            borderRadius: '4px',
            padding: '50px 10px',
            boxShadow: theme.shadows.xs,
            backgroundColor: getColorScheme(
              theme.colorScheme,
              theme.colors.dark[5],
              theme.colors.white[4],
            ),
            [`@media (min-width: ${theme.breakpoints.md})`]: {
              width: '800px',
            },
            [`@media (min-width: ${theme.breakpoints.lg})`]: {
              width: '1200px',
            },
          })}
        >
          <Box
            className='wrapper-content'
            sx={(theme: MantineTheme) => ({
              width: '260px',
              [`@media (min-width: ${theme.breakpoints.xs})`]: {
                width: '460px',
              },
              [`@media (min-width: ${theme.breakpoints.sm})`]: {
                width: '510px',
              },
              [`@media (min-width: ${theme.breakpoints.lg})`]: {
                width: '690px',
              },
            })}
          >
            <Box
              className='description'
              sx={{
                lineHeight: '20px',
                textAlign: 'center',
              }}
            >
              {childrenTitle}
            </Box>
            {children}
          </Box>
        </Flex>
      </Flex>
      {notification && (
        <Overlay
          styles={{
            root: {
              height: '100%',
              position: 'fixed',
              backgroundColor: 'transparent',
            },
          }}
        >
          <Notification
            description={messageError}
            title='Something went wrong!'
            styles={{
              root: {
                position: 'absolute',
                right: '30px',
                bottom: '30px',
              },
            }}
          />
        </Overlay>
      )}
    </Box>
  );
};

export default Wrapper;
