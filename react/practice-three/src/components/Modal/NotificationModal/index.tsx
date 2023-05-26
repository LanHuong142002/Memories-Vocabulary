import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

// Components
import { Modal } from '@components';

interface NotificationModalProps {
  title: string;
  description: string;
  url: string;
  children?: ReactNode;
  onCancel?: () => void;
}

export const NotificationModal = ({
  url,
  description,
  children,
  title,
  onCancel,
}: NotificationModalProps): ReactElement => (
  <Modal url={url} toggleModal={onCancel}>
    <div className='notification-modal'>
      <div className='notification-modal-text'>
        <p className='title'>{title}</p>
        <p className='description'>{description}</p>
      </div>
      <div className='notification-modal-cta'>{children}</div>
    </div>
  </Modal>
);
