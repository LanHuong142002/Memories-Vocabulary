/* eslint-disable jsx-a11y/no-static-element-interactions */
// Styles
import './index.css';

// Components
import { Image, ImageProps } from '@components';

interface IdentityProps extends Pick<ImageProps, 'url' | 'isCircle' | 'alt' | 'onClick'> {
  text: string;
}

const Identity = ({ text, url, isCircle, alt, onClick }: IdentityProps) => {
  return (
    <div className='identity-wrapper'>
      <Image
        url={url}
        size={isCircle ? 'xs' : 'lg'}
        isCircle={isCircle}
        alt={alt}
        onClick={onClick}
      />
      <span onClick={onClick}>{text}</span>
    </div>
  );
};

export { Identity };
