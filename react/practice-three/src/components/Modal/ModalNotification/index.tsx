import { ReactNode } from 'react';
// Styles

import './index.css';

// Components
import { Modal } from '@components';

interface ModalNotificationProps {
  id?: string;
  title: string;
  description: string;
  url: string;
  children: ReactNode;
  onCancel: () => void;
}

const ModalNotification = ({
  url,
  description,
  children,
  title,
  onCancel,
}: ModalNotificationProps) => {
  return (
    <Modal url={url} toggleModal={onCancel}>
      <div className='modal-notification'>
        <div className='confirm-modal-text'>
          <p className='title'>{title}</p>
          <p className='description'>{description}</p>
        </div>
        <div className='confirm-modal-cta'>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalNotification;
