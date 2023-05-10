import { MouseEvent } from 'react';

// Styles
import './index.css';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'button' | 'submit' | 'reset';
  color?: 'success' | 'warning' | 'default';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  text,
  variant = 'primary',
  size = 'sm',
  color = 'default',
  type = 'button',
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-color-${color} btn-${size}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button };
export type { ButtonProps };
