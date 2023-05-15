import { ReactNode } from 'react';

// Styles
import './index.css';

// Components
import { Image } from '@components';

interface ModalProps {
  children: ReactNode;
  title?: string;
  url?: string;
  toggleModal: () => void;
}

const Modal = ({ title, url, children, toggleModal }: ModalProps) => {
  return (
    <div className='overlay'>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <div className='modal-icon'>
            {url && <Image size='lg' alt='icon' url={url} />}
            {title && <p>{title}</p>}
          </div>
          <Image
            url={'/icons/cancel-icon.svg'}
            size='xxxs'
            onClick={toggleModal}
            isClickable={true}
            alt='icon cancel'
          />
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
