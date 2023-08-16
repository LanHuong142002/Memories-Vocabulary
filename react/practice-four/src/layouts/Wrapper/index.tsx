import { Link } from 'react-router-dom';
import { ChangeEvent, ReactNode, memo, useCallback, useContext, useState } from 'react';

// Contexts
import { ThemeContext } from '@contexts';

// Constants
import { ROUTES } from '@constants';

// Components
import { Button, ToggleTheme } from '@components';

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
  const { onToggleTheme } = useContext(ThemeContext);
  const [toggle, setToggle] = useState<boolean>(false);

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
        <Button variant='primary' size='xs'>
          Back to Home
        </Button>
      </Link>
    </div>
  ));

  const MemoizedTitle = memo(({ children }: { children: ReactNode }) => (
    <div className='description'>{children}</div>
  ));

  return (
    <div className={`wrapper wrapper-${className}-page`}>
      <WrapperHeader />
      <div className='wrapper-content'>
        <div className='wrapper-box'>
          <MemoizedTitle>{childrenTitle}</MemoizedTitle>
          {children}
        </div>
      </div>
    </div>
  );
};
