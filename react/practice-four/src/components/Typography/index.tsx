import { ReactNode } from 'react';
import './index.css';

interface TypographyProps {
  theme?: 'light' | 'dark';
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  color?: 'primary' | 'secondary' | 'tertiary';
  tagName?: 'p' | 'span';
  children: ReactNode;
}

export const Typography = ({
  theme = 'light',
  size = 'xs',
  color = 'primary',
  tagName: TagName = 'p',
  children,
}: TypographyProps) => (
  <TagName
    className={`typography typography-${size} typography-color-${color} typography-${theme}`}
  >
    {children}
  </TagName>
);
