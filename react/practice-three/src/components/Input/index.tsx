import { ChangeEvent, ReactElement } from 'react';

// Styles
import './index.css';

export interface InputProps {
  name: string;
  value: string;
  placeholder?: string;
  variant?: 'default' | 'primary';
  type?: 'text' | 'number';
  title?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  name,
  value,
  placeholder,
  title,
  variant = 'default',
  type = 'text',
  onChange,
}: InputProps): ReactElement => (
  <>
    {title ? (
      <div className='text-wrapper'>
        <label>{title}</label>
        <input
          className={`text-input text-input-${variant}`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    ) : (
      <input
        className={`text-input text-input-${variant}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    )}
  </>
);
