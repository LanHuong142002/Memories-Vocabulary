import { MouseEvent } from 'react';

// Styles
import './index.css';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'submit' | 'reset';
  color?: 'success' | 'warning' | 'default';
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  variant = 'primary',
  size = 'sm',
  color = 'default',
  type = 'button',
  isDisabled,
  isLoading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-color-${color} btn-${size} ${
        isDisabled ? 'btn-disabled' : ''
      } ${isLoading ? 'btn-loading' : ''}`}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading && <span className='loader'></span>}
      <span>{label}</span>
    </button>
  );
};

export { Button };
export type { ButtonProps };
