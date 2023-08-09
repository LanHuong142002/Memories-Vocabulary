import { ChangeEvent, ReactNode, useState } from 'react';

// Styles
import './index.css';

// Components
import { Button, ToggleTheme } from '@components';

export const Wrapper = ({
  className,
  children,
  childrenTitle,
}: {
  className: string;
  children: ReactNode;
  childrenTitle: ReactNode;
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

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
        <Button variant='primary' size='xs' onClick={handleBackToHome}>
          Back to Home
        </Button>
      </div>
      <div className='wrapper-content'>
        <div className='wrapper-box'>
          <div className='description'>{childrenTitle}</div>
          {children}
        </div>
      </div>
    </div>
  );
};
