import { forwardRef, MouseEvent, ReactElement } from 'react';

// Styles
import './index.css';

export interface ImageProps {
  isCircle?: boolean;
  isClickable?: boolean;
  url: string;
  alt?: string;
  size?: 'xxxs' | 'xxs' | 'xs' | 's' | 'md' | 'lg' | 'xl' | 'xxl';
  onClick?: (e: MouseEvent) => void;
}

export const Image = forwardRef<HTMLElement, ImageProps>(function Image(
  { isClickable, isCircle, url, alt = 'image', size = 'xs', onClick },
  ref,
): ReactElement {
  const classes = `image-wrapper image-size-${size} ${isClickable ? 'image-cursor-pointer' : ''}`;

  return (
    <figure className={classes} onClick={onClick} ref={ref}>
      <img className={`image ${isCircle ? 'image-circle' : ''}`} src={url} alt={alt} />
    </figure>
  );
});
