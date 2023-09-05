import { ReactNode, memo } from 'react';

// Constants
import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT, SPINNER_SIZE } from '@constants';

// Styles
import './index.css';
import { Spinner } from '@components';

interface ButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  className?: string;
  type?: BUTTON_TYPE;
  variant?: BUTTON_VARIANT;
  size?: BUTTON_SIZE;
  onClick?: () => void;
  children?: ReactNode;
}

const Button = memo(
  ({
    isLoading = false,
    isDisabled = false,
    label,
    className,
    type = BUTTON_TYPE.BUTTON,
    size = BUTTON_SIZE.S,
    variant = BUTTON_VARIANT.PRIMARY,
    onClick,
    children,
  }: ButtonProps) => (
    <button
      type={type}
      className={`btn btn-size-${size} btn-${variant} ${className ? className : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <Spinner size={SPINNER_SIZE.S} /> : <>{children || label}</>}
    </button>
  ),
);

export default Button;
