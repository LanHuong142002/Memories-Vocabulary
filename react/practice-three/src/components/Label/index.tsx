import { ReactElement } from 'react';

// Styles
import './index.css';

export interface LabelProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning';
}

export const Label = ({ text, variant }: LabelProps): ReactElement => (
  <div className={`label-wrapper ${variant ? `label-${variant}` : ''}`}>
    <span>{text}</span>
  </div>
);
