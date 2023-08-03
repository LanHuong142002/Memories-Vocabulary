import { ChangeEvent, memo, useState } from 'react';

// Styles
import './index.css';

export interface InputProps {
  placeholder: string;
  value: string;
  error?: string;
  name?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onChange: (event: ChangeEvent) => void;
}

export const Input = memo(
  ({ placeholder, value, name, error, onChange, variant = 'primary' }: InputProps) => {
    const [isDefault, setIsDefault] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent) => {
      // Because the input tertiary have 3 status: default, success, and failed
      // So this state is check that if the input changed, the status just have two status left
      setIsDefault(true);
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div
        className={`input-wrapper input-${variant} ${
          isDefault && (error ? 'input-error' : 'input-success')
        }`}
      >
        {variant !== 'primary' && <span className={error ? 'title-error' : ''}>Title</span>}
        <input
          className={`input input-${variant}`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleInputChange}
        />
        {error && (
          <div className='error-wrapper'>
            <span className='error'>{error}</span>
          </div>
        )}
      </div>
    );
  },
);
