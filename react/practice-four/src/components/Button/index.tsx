import { ReactNode } from 'react';
import './index.css';

export interface ButtonProps {
  isDisabled?: boolean;
  label: string;
  size?: 'xs' | 's' | 'm';
  onClick: () => void;
  children?: ReactNode;
}

export const Button = ({
  isDisabled = false,
  label,
  size = 's',
  onClick,
  children,
}: ButtonProps) => (
  <button type='button' className={`btn btn-size-${size}`} onClick={onClick} disabled={isDisabled}>
    {children || label}
  </button>
);
