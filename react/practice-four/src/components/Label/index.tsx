import { memo } from 'react';

// Styles
import './index.css';

interface LabelProps {
  name: string;
  color: 'success' | 'failed' | 'normal';
}

const Label = memo(({ name, color }: LabelProps) => (
  <div className={`label label-${color}`}>
    <span>{name}</span>
  </div>
));

export default Label;
