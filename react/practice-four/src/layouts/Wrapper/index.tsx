import { Link } from 'react-router-dom';
import {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Contexts
import { VocabularyContext, ThemeContext, TopicContext } from '@contexts';

// Constants
import { ROUTES, SIZE, VARIANT } from '@constants';

// Components
import { Button, Notification, ToggleTheme } from '@components';

// Styles
import './index.css';

export const Wrapper = ({
  className,
  children,
  childrenTitle,
}: {
  className: string;
  children: ReactNode;
  childrenTitle: ReactNode;
}) => {
  const { onToggleTheme, theme } = useContext(ThemeContext);
  const { errorsVocabulary } = useContext(VocabularyContext);
  const { errorsTopic } = useContext(TopicContext);
  const [toggle, setToggle] = useState<boolean>(!(theme === 'light'));
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
  const handleToggleTheme = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.currentTarget;
      setToggle(checked);
      onToggleTheme(checked);
    },
    [onToggleTheme],
  );

  const WrapperHeader = memo(() => (
    <div className='wrapper-header'>
      <ToggleTheme isChecked={toggle} onChange={handleToggleTheme} />
      <Link to={ROUTES.HOME}>
        <Button variant={VARIANT.PRIMARY} size={SIZE.XS}>
          Back to Home
        </Button>
      </Link>
    </div>
  ));

  const MemoizedTitle = memo(({ children }: { children: ReactNode }) => (
    <div className='description'>{children}</div>
  ));

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
      <WrapperHeader />
      <div className='wrapper-container'>
        <div className='wrapper-box'>
          <div className='wrapper-content'>
            <MemoizedTitle>{childrenTitle}</MemoizedTitle>
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
