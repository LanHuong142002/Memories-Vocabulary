import { ChangeEvent, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Styles
import './index.css';

interface InputProps {
  value: string;
  ariaLabel?: string;
  title?: string;
  dataTestId?: string;
  placeholder?: string;
  errors?: string[] | null;
  name?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = memo(
  ({
    placeholder,
    ariaLabel,
    title,
    value,
    name,
    errors,
    dataTestId,
    variant = 'primary',
    onChange,
  }: InputProps) => (
    <div
      className={`input-wrapper input-${variant} ${
        errors ? (errors.length > 0 ? 'input-error' : 'input-success') : ''
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
        data-testid={dataTestId}
        aria-label={ariaLabel}
      />
      {errors && errors.length >= 0 && (
        <>
          {errors.map((error) => (
            <div key={uuidv4()} className='error-wrapper'>
              <span className='error'>{error}</span>
            </div>
          ))}
        </>
      )}
    </div>
  ),
);

export default Input;
