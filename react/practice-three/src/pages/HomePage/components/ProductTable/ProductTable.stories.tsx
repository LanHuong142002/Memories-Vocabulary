import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

// Images
import Product from '@assets/images/product.jpg';
import Avatar from '@assets/images/avatar.jpg';

// Components
import { ProductTable } from '@pages';

import { Filters } from '.';

export default {
  title: 'PracticeTwo/HomePage/ProductTable',
  component: ProductTable,
  decorators: [
    (Story) => (
      <div style={{ padding: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ProductTable>;

const Template: ComponentStory<typeof ProductTable> = () => {
  const [filter, setFilter] = useState<Filters>({
    name: '',
    statusesId: '',
    typesId: '',
    quantity: '',
    brand: '',
    price: '',
  });

  const listStatus = [
    { id: '1', name: 'Available' },
    { id: '2', name: 'Sold out' },
  ];

  const listType = [
    { id: '1', name: 'TV' },
    { id: '2', name: 'Smart Phone' },
  ];

  const products = [
    {
      id: '1',
      image: Product,
      name: 'Louis Vuitton',
      statuses: {
        id: '1',
        name: 'Available',
      },
      types: {
        id: '1',
        name: 'TV',
      },
      quantity: 123,
      brandImage: Avatar,
      brand: 'Evan Flores',
      price: 200,
    },
    {
      id: '2',
      image: Product,
      name: 'Louis Vuitton',
      statuses: {
        id: '1',
        name: 'Available',
      },
      types: {
        id: '1',
        name: 'TV',
      },
      quantity: 123,
      brandImage: Avatar,
      brand: 'Evan Flores',
      price: 200,
    },
    {
      id: '3',
      image: Product,
      name: 'Louis Vuitton',
      statuses: {
        id: '1',
        name: 'Available',
      },
      types: {
        id: '1',
        name: 'TV',
      },
      quantity: 123,
      brandImage: Avatar,
      brand: 'Evan Flores',
      price: 200,
    },
  ];

  const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSetProductItem = () => {
    console.log('handle set product item');
  };

  const handleEdit = () => {
    console.log('edit');
  };

  const handleToggleNotification = () => {
    console.log('toggle');
  };

  return (
    <ProductTable
      filters={filter}
      products={products}
      statuses={listStatus}
      types={listType}
      onSearch={handleSearch}
      onEdit={handleEdit}
      onToggleNotification={handleToggleNotification}
      onSetProductItem={onSetProductItem}
    />
  );
};

export const Default = Template.bind({});
