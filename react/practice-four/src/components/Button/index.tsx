import { ReactNode, memo } from 'react';

// Constants
import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT } from '@constants';

// Styles
// import './index.css';
import { ButtonProps, Button as ButtonMantine } from '@mantine/core';

interface Props extends ButtonProps {
  dataTestId?: string;
  variant?: BUTTON_VARIANT;
  size?: BUTTON_SIZE;
  onClick?: () => void;
  children?: ReactNode;
}

const Button = memo(
  ({
    dataTestId,
    type = BUTTON_TYPE.BUTTON,
    size = BUTTON_SIZE.S,
    variant = BUTTON_VARIANT.PRIMARY,
    children,
    ...props
  }: Props) => (
    <ButtonMantine type={type} variant={variant} data-testid={dataTestId} size={size} {...props}>
      {children}
    </ButtonMantine>
  ),
);

export default Button;
