import { memo } from 'react';

// Styles
import './index.css';

interface NotificationProps {
  title: string;
  description: string;
}

const Notification = memo(({ description, title }: NotificationProps) => (
  <div className='notification'>
    <p className='title'>{title}</p>
    <p className='description'>{description}</p>
  </div>
));

export default Notification;
