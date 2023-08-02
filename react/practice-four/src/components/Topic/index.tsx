// Styles
import './index.css';

export interface TopicProps {
  isAddNew?: boolean;
  quantity?: number;
  text: string;
  variant?: 'default' | 'selected';
  onClick: () => void;
}

export const Topic = ({
  isAddNew = false,
  quantity = 0,
  text,
  variant = 'default',
  onClick,
}: TopicProps) => (
  <div className={`topic topic-${variant}`} onClick={onClick}>
    <span>{`${text} ${quantity > 0 ? `(${quantity})` : ''}`}</span>
    <div className='topic-icon'>
      <span>{isAddNew ? '+' : '✔'}</span>
    </div>
  </div>
);
