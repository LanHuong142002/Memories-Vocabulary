import { ReactNode, memo } from 'react';

// Styles
import './index.css';

interface ButtonProps {
  isDisabled?: boolean;
  label?: string;
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 's' | 'm';
  onClick: () => void;
  children?: ReactNode;
}

const Button = memo(
  ({
    isDisabled = false,
    label,
    size = 's',
    variant = 'primary',
    onClick,
    children,
  }: ButtonProps) => (
    <button
      type='button'
      className={`btn btn-size-${size} btn-${variant}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children || label}
    </button>
  ),
);

export default Button;
