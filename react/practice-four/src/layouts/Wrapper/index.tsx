import { ChangeEvent, ReactNode, useState } from 'react';

// Styles
import './index.css';

// Components
import { Button, ToggleTheme } from '@components';

export const Wrapper = ({ className, children }: { className: string; children: ReactNode }) => {
  const [toggle, setToggle] = useState(false);

  /**
   * @description function change theme
   *
   * @param {Event} event of input element
   */
  const handleToggleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    setToggle(checked);
  };

  const handleBackToHome = () => {
    // TODO: handle back to home page
  };

  return (
    <div className={`wrapper wrapper-${className}-page`}>
      <div className='wrapper-header'>
        <ToggleTheme isChecked={toggle} onChange={handleToggleTheme} />
        <Button onClick={handleBackToHome}>Back to Home</Button>
      </div>
      <div className='wrapper-content'>
        <div className='wrapper-box'>{children}</div>
      </div>
    </div>
  );
};
