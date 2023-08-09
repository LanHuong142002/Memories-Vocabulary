// Styles
import { memo } from 'react';

// Styles
import './index.css';

interface TopicProps {
  id?: string;
  isAddNew?: boolean;
  quantity?: number;
  name: string;
  variant?: 'default' | 'selected';
  onClick: (id?: string) => void;
}

const Topic = memo(
  ({ id, isAddNew = false, quantity = 0, name, variant = 'default', onClick }: TopicProps) => {
    const handleOncLick = () => {
      onClick(id);
    };

    return (
      <div className={`topic topic-${variant}`} onClick={handleOncLick}>
        <span>{`${name} ${quantity > 0 ? `(${quantity})` : ''}`}</span>
        <div className='topic-icon'>
          <span>{isAddNew ? '\u002b' : '\u2714'}</span>
        </div>
      </div>
    );
  },
);

export default Topic;
