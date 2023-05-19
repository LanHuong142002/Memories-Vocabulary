// Styles
import './index.css';

interface LabelProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning';
}

const Label = ({ text, variant }: LabelProps): React.ReactElement => (
  <div className={`label-wrapper ${variant ? `label-${variant}` : ''}`}>
    <span>{text}</span>
  </div>
);

export { Label };
export type { LabelProps };
