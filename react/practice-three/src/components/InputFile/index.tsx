import { ChangeEvent } from 'react';

// Styles
import './index.css';
import { Image, ImageProps } from '@components';

interface InputFileProps extends Pick<ImageProps, 'image' | 'size'> {
  name: string;
  id: string;
  text: string;
  variant?: 'primary' | 'secondary';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = ({
  name,
  id,
  image,
  size,
  variant = 'primary',
  text,
  onChange,
}: InputFileProps) => {
  return (
    <label htmlFor={id} className={`input-file-wrapper input-file-${variant}`}>
      <Image image={image} size={size} />
      <div>
        {text}
        <input type='file' name={name} id={id} accept='image/png, image/jpeg' onChange={onChange} />
      </div>
    </label>
  );
};

export default InputFile;
