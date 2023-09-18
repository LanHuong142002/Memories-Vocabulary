import { Link, useLocation } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Contexts
import { VocabularyContext, TopicContext } from '@contexts';

// Constants
import { BUTTON_SIZE, BUTTON_VARIANT, ROUTES } from '@constants';

// Components
import { Button, Notification, ToggleTheme } from '@components';

// Styles
import './index.css';

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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { errorsVocabulary } = useContext(VocabularyContext);
  const { errorsTopic } = useContext(TopicContext);
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const hasNotification = useMemo(
    () => showNotification && (errorsTopic || errorsVocabulary),
    [errorsTopic, errorsVocabulary, showNotification],
  );

  /**
   * @description function change theme
   *
   * @param {Event} event of input element
   */
  const handleToggleTheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  useEffect(() => {
    if (errorsTopic || errorsVocabulary) {
      const timeout = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [errorsTopic, errorsVocabulary]);

  return (
    <div className={`wrapper wrapper-${className}-page`}>
      {useMemo(
        () => (
          <div className='wrapper-header'>
            <ToggleTheme isChecked={colorScheme === 'light'} onChange={handleToggleTheme} />
            {location.pathname !== ROUTES.HOME && (
              <Link to={ROUTES.HOME}>
                <Button variant={BUTTON_VARIANT.PRIMARY} size={BUTTON_SIZE.XS}>
                  Back to Home
                </Button>
              </Link>
            )}
          </div>
        ),
        [colorScheme, handleToggleTheme, location.pathname],
      )}
      <div className='wrapper-container'>
        <div className='wrapper-box'>
          <div className='wrapper-content'>
            <div className='description'>{childrenTitle}</div>
            {children}
          </div>
        </div>
      </div>
      {hasNotification && (
        <Notification description={errorsTopic || errorsVocabulary} title='Something went wrong!' />
      )}
    </div>
  );
};

export default Wrapper;
