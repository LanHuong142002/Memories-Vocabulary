import { ReactNode, memo } from 'react';

// Constants
import { SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_TEXT_ALIGN, VARIANT } from '@constants';

// Styles
import './index.css';

interface TypographyProps {
  textAlign?: TYPOGRAPHY_TEXT_ALIGN;
  className?: 'highlight';
  size?: SIZE;
  color?: VARIANT.PRIMARY | VARIANT.SECONDARY | VARIANT.TERTIARY;
  tagName?: TYPOGRAPHY_TAG_NAME;
  children: ReactNode;
}

const Typography = memo(
  ({
    textAlign,
    className,
    size = SIZE.XS,
    color = VARIANT.PRIMARY,
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
