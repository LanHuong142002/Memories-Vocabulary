import { ChangeEvent, memo } from 'react';

// Styles
import './index.css';

interface InputProps {
  value: string;
  title?: string;
  placeholder?: string;
  errors?: string[];
  name?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(
  ({ placeholder, title, value, name, errors, onChange, variant = 'primary' }: InputProps) => (
    <div
      className={`input-wrapper input-${variant} ${
        value && (errors?.length ? 'input-error' : 'input-success')
      }`}
    >
      {variant !== 'primary' && (
        <span className={errors && errors.length > 0 ? 'title-error' : ''}>{title}</span>
      )}
      <input
        className={`input input-${variant}`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {errors && errors.length >= 0 && (
        <>
          {errors.map((error) => (
            <div key={crypto.randomUUID()} className='error-wrapper'>
              <span className='error'>{error}</span>
            </div>
          ))}
        </>
      )}
    </div>
  ),
);

export default Input;
