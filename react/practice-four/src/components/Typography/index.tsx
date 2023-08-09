import { ReactNode, useContext } from 'react';

// Contexts
import { ThemeContext } from '@contexts';

// Styles

// Styles
import './index.css';

interface TypographyProps {
  theme?: 'light' | 'dark';
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  color?: 'primary' | 'secondary' | 'tertiary';
  tagName?: 'p' | 'span';
  children: ReactNode;
}

const Typography = ({
  size = 'xs',
  color = 'primary',
  tagName: TagName = 'p',
  children,
}: TypographyProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TagName
      className={`typography typography-${size} typography-color-${color} typography-${theme}`}
    >
      {children}
    </TagName>
  );
};

export default Typography;
