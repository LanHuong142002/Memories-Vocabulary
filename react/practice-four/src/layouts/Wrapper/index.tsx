import { ChangeEvent, ReactNode, useCallback, useContext, useState } from 'react';

// Contexts
import { ThemeContext } from '@contexts';

// Components
import { Button, ToggleTheme } from '@components';

// Styles
import './index.css';

export const Wrapper = ({ className, children }: { className: string; children: ReactNode }) => {
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

  const handleBackToHome = () => {
    // TODO: handle back to home page
  };

  return (
    <div className={`wrapper wrapper-${className}-page`}>
      <div className='wrapper-header'>
        <ToggleTheme isChecked={toggle} onChange={handleToggleTheme} />
        <Button variant='primary' size='xs' onClick={handleBackToHome}>
          Back to Home
        </Button>
      </div>
      <div className='wrapper-content'>
        <div className='wrapper-box'>{children}</div>
      </div>
    </div>
  );
};
