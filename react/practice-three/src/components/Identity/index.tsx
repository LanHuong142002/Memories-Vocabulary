// Styles
import { memo } from 'react';
import './index.css';

// Components
import { Image, ImageProps } from '@components';

interface IdentityProps extends Pick<ImageProps, 'url' | 'isCircle' | 'alt'> {
  text: string;
}

const Identity = memo(
  ({ text, url, isCircle, alt }: IdentityProps): React.ReactElement => (
    <div className='identity-wrapper' data-testid={'identity-wrapper'}>
      <Image url={url} size={isCircle ? 'xs' : 'lg'} isCircle={isCircle} alt={alt} />
      <span>{text}</span>
    </div>
  ),
);

export { Identity };
