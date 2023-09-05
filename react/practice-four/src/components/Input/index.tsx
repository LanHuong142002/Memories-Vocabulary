import { ChangeEvent, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Constants
import { INPUT_VARIANT } from '@constants';

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
  variant?: INPUT_VARIANT;
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
    variant = INPUT_VARIANT.PRIMARY,
    onChange,
  }: InputProps) => (
    <div
      className={`input-wrapper input-${variant} ${
        errors ? (errors.length > 0 ? 'input-error' : 'input-success') : ''
      }`}
    >
      {variant !== INPUT_VARIANT.PRIMARY && (
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
        autoComplete='off'
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
