import { ComponentStory, ComponentMeta } from '@storybook/react';

// Images
import Product from '@assets/images/product.jpg';
import Avatar from '@assets/images/avatar.jpg';

// Components
import { ProductModal } from '@pages';

export default {
  title: 'PracticeTwo/HomePage/ProductModal',
  component: ProductModal,
} as ComponentMeta<typeof ProductModal>;

const Template: ComponentStory<typeof ProductModal> = () => {
  const product = {
    id: '1',
    image: Product,
    name: 'Louis Vuitton',
    quantity: 123,
    brandImage: Avatar,
    brand: 'Evan Flores',
    status: '2',
    type: '3',
    price: 200,
  };

  const status = [
    { id: '1', name: 'Available' },
    { id: '2', name: 'Sold out' },
  ];

  const types = [
    { id: '1', name: 'TV' },
    { id: '2', name: 'Smart Phone' },
  ];

  const handleConfirm = () => {
    console.log('confirm');
  };

  const handleErrorModal = () => {
    console.log('error modal');
  };

  const handleProductModal = () => {
    console.log('product modal');
  };

  return (
    <ProductModal
      productItem={product}
      statuses={status}
      types={types}
      onConfirm={handleConfirm}
      onToggleErrorModal={handleErrorModal}
      onToggleProductModal={handleProductModal}
      titleModal='Product information'
    />
  );
};

export const Default = Template.bind({});
