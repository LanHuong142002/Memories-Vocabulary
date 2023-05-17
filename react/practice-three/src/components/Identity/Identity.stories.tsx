import { ComponentStory, ComponentMeta } from '@storybook/react';

// Images
import ProductImage from '@assets/images/product.jpg';
import Avatar from '@assets/images/avatar.jpg';

// Components
import { Identity } from '.';

export default {
  title: 'PracticeTwo/Identity',
  component: Identity,
  decorators: [
    (Story) => (
      <div style={{ padding: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Identity>;

const Template: ComponentStory<typeof Identity> = (args) => <Identity {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Louis Vuitton',
  url: ProductImage,
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Evan Flores',
  url: Avatar,
  isCircle: true,
};
