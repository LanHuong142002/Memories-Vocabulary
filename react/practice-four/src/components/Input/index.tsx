import { ChangeEvent, memo } from 'react';

// Styles
import './index.css';

interface InputProps {
  placeholder: string;
  value: string;
  error?: string;
  name?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(
  ({ placeholder, value, name, error, onChange, variant = 'primary' }: InputProps) => (
    <div
      className={`input-wrapper input-${variant} ${
        value && (error ? 'input-error' : 'input-success')
      }`}
    >
      {variant !== 'primary' && <span className={error ? 'title-error' : ''}>Title</span>}
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
