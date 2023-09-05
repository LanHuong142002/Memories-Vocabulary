import { memo } from 'react';

// Constants
import { LABEL_COLOR } from '@constants';

// Styles
import './index.css';

interface LabelProps {
  name: string;
  color: LABEL_COLOR;
}

const Label = memo(({ name, color }: LabelProps) => (
  <label className={`label label-${color}`}>
    <span>{name}</span>
  </label>
));

export default Label;
