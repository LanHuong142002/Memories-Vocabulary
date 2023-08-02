// Styles
import './index.css';

export interface TopicProps {
  text: string;
  variant?: 'default' | 'selected';
  quantity?: number;
  isAddNew?: boolean;
  onClick: () => void;
}

export const Topic = ({
  text,
  variant = 'default',
  quantity = 0,
  isAddNew = false,
  onClick,
}: TopicProps) => (
  <div className={`topic topic-${variant}`} onClick={onClick}>
    <span>{`${text} ${quantity > 0 ? `(${quantity})` : ''}`}</span>
    <div className='topic-icon'>
      <span>{isAddNew ? '+' : '✔'}</span>
    </div>
  </div>
);
