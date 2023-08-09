// Styles
import { memo } from 'react';

// Styles
import './index.css';

interface TopicProps {
  isAddNew?: boolean;
  quantity?: number;
  name: string;
  variant?: 'default' | 'selected';
  onClick: () => void;
}

const Topic = memo(
  ({ isAddNew = false, quantity = 0, name, variant = 'default', onClick }: TopicProps) => (
    <div className={`topic topic-${variant}`} onClick={onClick}>
      <span>{`${name} ${quantity > 0 ? `(${quantity})` : ''}`}</span>
      <div className='topic-icon'>
        <span>{isAddNew ? '\u002b' : '\u2714'}</span>
      </div>
    </div>
  ),
);

export default Topic;
