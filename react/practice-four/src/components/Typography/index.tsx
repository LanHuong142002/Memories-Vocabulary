import { ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TypographyProps {
  textAlign?: 'center' | 'right' | 'left';
  className?: 'highlight';
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  color?: 'primary' | 'secondary' | 'tertiary';
  tagName?: 'p' | 'span';
  children: ReactNode;
}

const Typography = memo(
  ({
    textAlign,
    className,
    size = 'xs',
    color = 'primary',
    tagName: TagName = 'p',
    children,
  }: TypographyProps) => (
    <TagName
      className={`typography typography-${size} typography-color-${color} ${
        className ? `typography-${className}` : ''
      }`}
      style={{ textAlign: textAlign }}
    >
      {children}
    </TagName>
  ),
);

export default Typography;
