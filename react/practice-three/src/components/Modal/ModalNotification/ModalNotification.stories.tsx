import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Button, ModalNotification } from '@components';

export default {
  title: 'PracticeTwo/Modal/ModalNotification',
  component: ModalNotification,
} as ComponentMeta<typeof ModalNotification>;

const Template: ComponentStory<typeof ModalNotification> = (args) => {
  return <ModalNotification {...args} />;
};

export const Notification = Template.bind({});
Notification.args = {
  children: (
    <>
      <Button label='Close' variant='tertiary' color='warning' size='lg' />
    </>
  ),
  url: '/icons/error-icon.svg',
  title: 'Ooops!',
  description: 'Something went wrong',
  onCancel: () => {
    console.log('close');
  },
};

export const Confirm = Template.bind({});
Confirm.args = {
  children: (
    <>
      <Button label='Cancel' variant='secondary' color='default' size='lg' />
      <Button label='Delete' variant='tertiary' color='warning' size='lg' />
    </>
  ),
  url: '/icons/trash-icon.svg',
  title: 'Delete product',
  description: 'Are you sure you want to delete this product? This action cannot be undone.',
  onCancel: () => {
    console.log('close');
  },
};
