import './index.css';

interface LabelProps {
  name: string;
  color: 'success' | 'failed' | 'normal';
}

export const Label = ({ name, color }: LabelProps) => (
  <div className={`label label-${color}`}>
    <span>{name}</span>
  </div>
);
