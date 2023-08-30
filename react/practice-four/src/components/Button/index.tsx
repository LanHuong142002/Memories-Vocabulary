import { ReactNode, memo } from 'react';

// Constants
import { BUTTON_TYPE, SIZE, VARIANT } from '@constants';

// Styles
import './index.css';

interface ButtonProps {
  isDisabled?: boolean;
  label?: string;
  className?: string;
  type?: BUTTON_TYPE;
  variant?: VARIANT.PRIMARY | VARIANT.SECONDARY | VARIANT.TERTIARY;
  size?: SIZE.XS | SIZE.S | SIZE.M | SIZE.XXL;
  onClick?: () => void;
  children?: ReactNode;
}

const Button = memo(
  ({
    isDisabled = false,
    label,
    className,
    type = BUTTON_TYPE.BUTTON,
    size = SIZE.S,
    variant = VARIANT.PRIMARY,
    onClick,
    children,
  }: ButtonProps) => (
    <button
      type={type}
      className={`btn btn-size-${size} btn-${variant} ${className ? className : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children || label}
    </button>
  ),
);

export default Button;
