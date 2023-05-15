import { forwardRef, MouseEvent } from 'react';

// Styles
import './index.css';

// helpers
import { loaderImage } from '@helpers';

interface ImageProps {
  url: string;
  alt?: string;
  size?: 'xxs' | 'xs' | 's' | 'md' | 'lg' | 'xl' | 'xxl';
  isCircle?: boolean;
  isClickable?: boolean;
  onClick?: (e: MouseEvent) => void;
}

const Image = forwardRef<HTMLElement, ImageProps>(function Image(
  { url, isCircle, alt = 'image', size = 'xs', isClickable, onClick },
  ref,
) {
  return (
    <figure
      className={`image-wrapper image-size-${size} ${isClickable ? 'image-cursor-pointer' : ''}`}
      onClick={onClick}
      ref={ref}
    >
      <img className={`image ${isCircle ? 'image-circle' : ''}`} src={loaderImage(url)} alt={alt} />
    </figure>
  );
});

export { Image };
export type { ImageProps };
