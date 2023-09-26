import { ReactNode, memo } from 'react';

// Constants
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAG_NAME, TYPOGRAPHY_VARIANT } from '@constants';

// Styles
import { Text, TextProps } from '@mantine/core';

interface TypographyProps extends TextProps {
  size?: TYPOGRAPHY_SIZE;
  variant?: TYPOGRAPHY_VARIANT;
  tagName?: TYPOGRAPHY_TAG_NAME;
  children: ReactNode;
}

const Typography = memo(
  ({
    variant,
    size = TYPOGRAPHY_SIZE.XS,
    tagName = TYPOGRAPHY_TAG_NAME.P,
    children,
    ...props
  }: TypographyProps) => (
    <Text component={tagName} variant={variant} size={size} {...props}>
      {children}
    </Text>
  ),
);

export default Typography;
