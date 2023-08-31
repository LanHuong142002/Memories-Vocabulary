import { ReactNode, memo } from 'react';

// Styles
import './index.css';
import { Spinner } from '@components';

interface ButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  className?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 's' | 'm' | 'xxl';
  onClick?: () => void;
  children?: ReactNode;
}

const Button = memo(
  ({
    isLoading = false,
    isDisabled = false,
    label,
    className,
    type = 'button',
    size = 's',
    variant = 'primary',
    onClick,
    children,
  }: ButtonProps) => (
    <button
      type={type}
      className={`btn btn-size-${size} btn-${variant} ${className ? className : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Spinner size='s' /> : <>{children || label}</>}
    </button>
  ),
);

export default Button;
