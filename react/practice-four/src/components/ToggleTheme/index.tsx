import { ChangeEvent } from 'react';
import './index.css';

interface ToggleThemeProps {
  isChecked: boolean;
  theme?: 'light' | 'dark';
  onChange: (event: ChangeEvent) => void;
}

export const ToggleTheme = ({ isChecked, theme = 'light', onChange }: ToggleThemeProps) => (
  <label className='toggle' htmlFor='toggle-theme'>
    <input checked={isChecked} id='toggle-theme' type='checkbox' onChange={onChange} />
    <span className={`slider-wrapper slider-wrapper-${theme}`} />
  </label>
);
