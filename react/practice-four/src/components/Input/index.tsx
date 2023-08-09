import { ChangeEvent, memo } from 'react';

// Styles
import './index.css';

interface InputProps {
  value: string;
  title?: string;
  placeholder?: string;
  error?: string;
  name?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onChange: (event: ChangeEvent) => void;
}

const Input = memo(
  ({ placeholder, title, value, name, error, onChange, variant = 'primary' }: InputProps) => (
    <div
      className={`input-wrapper input-${variant} ${
        value && (error ? 'input-error' : 'input-success')
      }`}
    >
      {variant !== 'primary' && <span className={error ? 'title-error' : ''}>{title}</span>}
      <input
        className={`input input-${variant}`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && (
        <div className='error-wrapper'>
          <span className='error'>{error}</span>
        </div>
      )}
    </div>
  ),
);

export default Input;
