import { memo } from 'react';

// Components
import { Button } from '@components';

// Styles
import './index.css';

interface PaginationProps {
  onFirstList: () => void;
  onLastList: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = memo(({ onFirstList, onLastList, onNext, onPrev }: PaginationProps) => (
  <div className='pagination'>
    <Button variant='secondary' label='&laquo;' onClick={onFirstList} />
    <Button variant='secondary' label='&lt;' onClick={onPrev} />
    <Button variant='secondary' label='&gt;' onClick={onNext} />
    <Button variant='secondary' label='&raquo;' onClick={onLastList} />
  </div>
));

export default Pagination;
