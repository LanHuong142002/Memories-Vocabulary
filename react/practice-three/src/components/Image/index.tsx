import { forwardRef, MouseEvent } from 'react';

// Styles
import './index.css';

interface ImageProps {
  url: string;
  alt?: string;
  size?: 'xxxs' | 'xxs' | 'xs' | 's' | 'md' | 'lg' | 'xl' | 'xxl';
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
      <img className={`image ${isCircle ? 'image-circle' : ''}`} src={url} alt={alt} />
    </figure>
  );
});

export { Image };
export type { ImageProps };
