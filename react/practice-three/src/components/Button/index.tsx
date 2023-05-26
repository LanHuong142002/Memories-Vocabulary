import { MouseEvent, ReactElement } from 'react';

// Styles
import './index.css';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'submit' | 'reset';
  color?: 'success' | 'warning' | 'default';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  label,
  variant = 'primary',
  size = 'sm',
  color = 'default',
  type = 'button',
  isDisabled,
  isLoading,
  onClick,
}: ButtonProps): ReactElement => {
  const classes = `btn btn-${variant} btn-color-${color} btn-${size} ${
    isDisabled ? 'btn-disabled' : ''
  } ${isLoading ? 'btn-loading' : ''}`;

  return (
    <button type={type} className={classes} onClick={onClick} disabled={isDisabled || isLoading}>
      {isLoading && <span className='loader'></span>}
      <span>{label}</span>
    </button>
  );
};
