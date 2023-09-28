import { memo } from 'react';
import { Badge, BadgeProps } from '@mantine/core';

// Constants
import { LABEL_COLOR } from '@constants';

interface LabelProps extends BadgeProps {
  name: string;
  color: LABEL_COLOR;
}

const Label = memo(({ name, color, ...props }: LabelProps) => (
  <Badge component='label' variant={color} {...props}>
    {name}
  </Badge>
));

export default Label;
