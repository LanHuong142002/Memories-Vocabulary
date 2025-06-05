import { memo } from 'react';
import {
  Notification as NotificationMantine,
  NotificationProps as NotificationPropsMantine,
} from '@mantine/core';

interface NotificationProps extends NotificationPropsMantine {
  icon?: string;
  title: string;
  description: string;
}

const Notification = memo(({ icon = '!', description, title, ...props }: NotificationProps) => (
  <NotificationMantine title={title} icon={icon} withCloseButton={false} {...props}>
    {description}
  </NotificationMantine>
));

export default Notification;
