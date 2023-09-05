import { memo } from 'react';

// Constants
import { TOPIC_VARIANT } from '@constants';

// Styles
import './index.css';

interface TopicProps {
  id?: string;
  isAddNew?: boolean;
  quantity?: number;
  name: string;
  variant?: TOPIC_VARIANT;
  onClick: (id?: string) => void;
}

const Topic = memo(
  ({
    id,
    isAddNew = false,
    quantity = 0,
    name,
    variant = TOPIC_VARIANT.DEFAULT,
    onClick,
  }: TopicProps) => {
    const handleOncLick = () => {
      onClick(id);
    };

    return (
      <div className={`topic topic-${variant}`} onClick={handleOncLick}>
        <p>{`${name}`}</p> <span className='quantity'>{quantity > 0 ? `(${quantity})` : ''}</span>
        <div className='topic-icon'>
          <span>{isAddNew ? '\u002b' : ''}</span>
        </div>
      </div>
    );
  },
);

export default Topic;
