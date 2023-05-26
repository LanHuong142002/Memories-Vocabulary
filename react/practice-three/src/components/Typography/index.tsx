// Styles
import { ReactElement } from 'react';

// Styles
import './index.css';

export interface TypographyProps {
  tagName?: 'h1' | 'h2' | 'h3' | 'p';
  text: string;
  size?: 'xs' | 's' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'quaternary';
  weight?: 'regular' | 'bold' | 'semiBold';
}

export const Typography = ({
  tagName = 'p',
  text,
  size = 'md',
  color = 'primary',
  weight,
}: TypographyProps): ReactElement => {
  const TagName = tagName;
  const classes = `typography typography-color-${color} typography-size-${size} ${
    weight ? `typography-weight-${weight}` : ''
  }`;

  return <TagName className={classes}>{text}</TagName>;
};
