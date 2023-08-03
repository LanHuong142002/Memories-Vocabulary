import './index.css';

interface NotificationProps {
  title: string;
  description: string;
  theme?: 'dark' | 'light';
}

export const Notification = ({ theme = 'dark', description, title }: NotificationProps) => (
  <div className={`notification notification-${theme}`}>
    <p className='title'>{title}</p>
    <p className='description'>{description}</p>
  </div>
);
