import { ChangeEvent } from 'react';

// Styles
import './index.css';

export interface ToggleThemeProps {
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleTheme = ({ isChecked, onChange }: ToggleThemeProps) => (
  <label className='toggle' htmlFor='toggle-theme'>
    <input checked={isChecked} id='toggle-theme' type='checkbox' onChange={onChange} />
    <span className={`slider-wrapper slider-wrapper-${isChecked ? 'dark' : 'light'}`} />
  </label>
);
