import { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

// Components
import { Image } from '@components';

// Helpers
import { loadImage } from '@helpers';

interface ModalProps {
  title?: string;
  url?: string;
  children: ReactNode;
  toggleModal?: () => void;
}

export const Modal = ({ title, url, children, toggleModal }: ModalProps): ReactElement => (
  <div className='overlay'>
    <div className='modal-wrapper'>
      <div className='modal-header'>
        <div className='modal-icon'>
          {url && <Image size='lg' alt='icon' url={loadImage(url)} />}
          {title && <p>{title}</p>}
        </div>
        <Image
          url={loadImage('/icons/cancel-icon.svg')}
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
