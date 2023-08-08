import { ReactNode, memo } from 'react';

// Styles
import './index.css';

export interface ButtonProps {
  isDisabled?: boolean;
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 's' | 'm' | 'xxl';
  onClick: () => void;
  children?: ReactNode;
}

export const Button = memo(
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
