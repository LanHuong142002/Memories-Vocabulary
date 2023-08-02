import { ReactNode } from 'react';
import './index.css';

export interface ButtonProps {
  label: string;
  children?: ReactNode;
  size?: 'xs' | 's' | 'm';
  isDisabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  label,
  children,
  size = 's',
  isDisabled = false,
  onClick,
}: ButtonProps) => (
  <button type='button' className={`btn btn-size-${size}`} onClick={onClick} disabled={isDisabled}>
    {children || label}
  </button>
);
