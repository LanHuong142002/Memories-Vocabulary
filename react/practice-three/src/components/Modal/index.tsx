import { ReactNode } from 'react';

// Styles
import './index.css';

// Images
import Cancel from '@assets/icons/cancel-icon.svg';

// Components
import { Image } from '@components';

interface ModalProps {
  children: ReactNode;
  title?: string;
  icon?: string;
  toggleModal: () => void;
}

const Modal = ({ title, icon, children, toggleModal }: ModalProps) => {
  return (
    <div className='overlay'>
      <div className='modal-wrapper'>
        <div className='modal-header'>
          <div className='modal-icon'>
            {icon && <Image size='lg' alt='icon' url={icon} />}
            {title && <p>{title}</p>}
          </div>
          <Image
            url={Cancel}
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
