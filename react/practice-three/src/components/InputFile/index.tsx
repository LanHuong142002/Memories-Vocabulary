import { ChangeEvent, ReactElement } from 'react';

// Styles
import './index.css';

// components
import { Image, ImageProps } from '@components';

interface InputFileProps extends Pick<ImageProps, 'url' | 'size'> {
  name: string;
  id: string;
  text: string;
  variant?: 'primary' | 'secondary';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile = ({
  name,
  id,
  url,
  size,
  variant = 'primary',
  text,
  onChange,
}: InputFileProps): ReactElement => (
  <label
    htmlFor={id}
    className={`input-file-wrapper input-file-${variant}`}
    data-testid='input-file-label'
  >
    <Image url={url} size={size} alt='icon upload' />
    <div>
      {text}
      <input type='file' name={name} id={id} accept='image/png, image/jpeg' onChange={onChange} />
    </div>
  </label>
);
