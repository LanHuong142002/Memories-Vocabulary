import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, MantineTheme } from '@mantine/core';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';

// Contexts
import { VocabularyContext, TopicContext } from '@contexts';

// Constants
import { BUTTON_SIZE, BUTTON_VARIANT, ROUTES } from '@constants';

// Helpers
import { getColorScheme } from '@helpers';

// Components
import { Button, Notification, ToggleTheme } from '@components';

const Wrapper = ({
  className,
  children,
  childrenTitle,
}: {
  className: string;
  children: ReactNode;
  childrenTitle: ReactNode;
}) => {
  const location = useLocation();
  const { errorsVocabulary } = useContext(VocabularyContext);
  const { errorsTopic } = useContext(TopicContext);
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const hasNotification = useMemo(
    () => showNotification && (errorsTopic || errorsVocabulary),
    [errorsTopic, errorsVocabulary, showNotification],
  );

  useEffect(() => {
    if (errorsTopic || errorsVocabulary) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errorsTopic, errorsVocabulary]);

  return (
    <Box
      className={`wrapper-${className}-page`}
      sx={{
        height: '100%',
      }}
    >
      {useMemo(
        () => (
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
              'button, a': {
                height: '100%',
              },
            }}
          >
            <ToggleTheme />
            {location.pathname !== ROUTES.HOME && (
              <Link to={ROUTES.HOME}>
                <Button variant={BUTTON_VARIANT.PRIMARY} size={BUTTON_SIZE.XS}>
                  Back to Home
                </Button>
              </Link>
            )}
          </Flex>
        ),
        [location.pathname],
      )}

      <Flex
        direction='column'
        justify='center'
        align='center'
        className='wrapper-container'
        sx={{
          /* 70px is height of wrapper header */
          minHeight: 'calc(100vh - 70px)',
          boxSizing: 'border-box',
          padding: '60px 20px',
        }}
      >
        <Flex
          direction='column'
          align='center'
          className='wrapper-box'
          sx={(theme: MantineTheme) => ({
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '4px',
            padding: '50px 10px',
            boxShadow: `0 2px 8px ${theme.colors.opacity[5]}`,
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
              [`@media (min-width: ${theme.breakpoints.lg})`]: {
                width: '850px',
              },
            })}
          >
            <Box
              className='description'
              sx={{
                lineHeight: '20px',
                textAlign: 'center',
                'p:first-of-type': {
                  paddingBottom: '10px',
                  lineHeight: '30px',
                },
                p: {
                  paddingBottom: '10px',
                },
              }}
            >
              {childrenTitle}
            </Box>
            {children}
          </Box>
        </Flex>
      </Flex>
      {hasNotification && (
        <Notification description={errorsTopic || errorsVocabulary} title='Something went wrong!' />
      )}
    </Box>
  );
};

export default Wrapper;
