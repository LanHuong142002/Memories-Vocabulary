import { ReactNode, memo } from 'react';

// Styles
import './index.css';

export interface ButtonProps {
  isDisabled?: boolean;
  label?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 's' | 'm';
  onClick: () => void;
  children?: ReactNode;
}

export const Button = memo(
  ({
    isDisabled = false,
    label,
    type = 'button',
    size = 's',
    variant = 'primary',
    onClick,
    children,
  }: ButtonProps) => (
    <button
      type={type}
      className={`btn btn-size-${size} btn-${variant}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children || label}
    </button>
  ),
);
