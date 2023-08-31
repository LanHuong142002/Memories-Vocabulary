import { ReactNode, memo } from 'react';

// Components
import { Button } from '@components';

// Styles
import './index.css';

interface ModalProps {
  title: string;
  description: string;
  onCloseModal: () => void;
  children: ReactNode;
}

const Modal = memo(({ title, description, onCloseModal, children }: ModalProps) => (
  <div className='modal'>
    <div className='modal-header'>
      <p className='title'>{title}</p>
      <Button className='button-close' variant='tertiary' size='xxl' onClick={onCloseModal}>
        &Chi;
      </Button>
    </div>
    <div className='modal-body'>
      <p className='description'>{description}</p>
    </div>
    <div className='modal-actions'>{children}</div>
  </div>
));

export default Modal;
