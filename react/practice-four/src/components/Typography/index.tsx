import { ReactNode, memo } from 'react';

// Styles
import './index.css';

interface TypographyProps {
  className?: 'highlight';
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  color?: 'primary' | 'secondary' | 'tertiary';
  tagName?: 'p' | 'span';
  children: ReactNode;
}

const Typography = memo(
  ({
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
    >
      {children}
    </TagName>
  ),
);

export default Typography;
