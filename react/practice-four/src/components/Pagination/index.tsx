import { memo } from 'react';

// Components
import { Button } from '@components';

// Styles
import './index.css';

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = memo(({ onNext, onPrev }: PaginationProps) => (
  <div className='pagination'>
    <Button variant='secondary' label='&laquo;' onClick={onPrev} />
    <Button variant='secondary' label='&raquo;' onClick={onNext} />
  </div>
));

export default Pagination;
