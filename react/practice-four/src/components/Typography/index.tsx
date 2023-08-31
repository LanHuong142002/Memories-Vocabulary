import { ReactNode, memo } from 'react';

// Constants
import {
  TYPOGRAPHY_SIZE,
  TYPOGRAPHY_TAG_NAME,
  TYPOGRAPHY_TEXT_ALIGN,
  TYPOGRAPHY_VARIANT,
} from '@constants';

// Styles
import './index.css';

interface TypographyProps {
  textAlign?: TYPOGRAPHY_TEXT_ALIGN;
  className?: 'highlight';
  size?: TYPOGRAPHY_SIZE;
  color?: TYPOGRAPHY_VARIANT;
  tagName?: TYPOGRAPHY_TAG_NAME;
  children: ReactNode;
}

const Typography = memo(
  ({
    textAlign,
    className,
    size = TYPOGRAPHY_SIZE.XS,
    color = TYPOGRAPHY_VARIANT.PRIMARY,
    tagName: TagName = TYPOGRAPHY_TAG_NAME.P,
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
