import { ComponentStory, ComponentMeta } from '@storybook/react';

// Images
import Avatar from '@assets/images/avatar.jpg';
import ProductImage from '@assets/images/product.jpg';
import More from '@assets/icons/more-icon.svg';

// Components
import { Image } from '@components';

export default {
  title: 'PracticeTwo/Image',
  component: Image,
  decorators: [
    (Story) => (
      <div style={{ padding: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  url: ProductImage,
  alt: 'product',
  size: 'md',
};

export const Circle = Template.bind({});
Circle.args = {
  url: Avatar,
  isCircle: true,
  alt: 'avatar',
  size: 'md',
};

export const Icon = Template.bind({});
Icon.args = {
  url: More,
  alt: 'icon more',
  size: 'xl',
  isClickable: true,
};
