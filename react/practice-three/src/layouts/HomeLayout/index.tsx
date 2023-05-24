import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// Services
import { getTypes, getStatuses, deleteProduct, getProductsByParam } from '@services';

// Hooks
import { useDebounce } from '@hooks';

// Interfaces
import { Product, ProductStatus, ProductType } from '@interfaces';

// Components
import { NotificationModal, Button } from '@components';
import { ProductTable, ProductModal } from '@pages';

// Styles
import './index.css';

interface Filter {
  name: string;
  statusesId: string;
  typesId: string;
  quantity: string;
  brand: string;
  price: string;
}

const HomeLayout = () => {
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);
  const [openNotificationModal, setOpenNotificationModal] = useState<boolean>(false);
  const [openNewProductModal, setOpenNewProductModal] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: '',
  });

  const [statuses, setStatuses] = useState<ProductStatus[]>([]);
  const [types, setTypes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Filter>({
    name: '',
    statusesId: '',
    typesId: '',
    quantity: '',
    brand: '',
    price: '',
  });
  const [productItem, setProductItem] = useState<Product>({
    id: '',
    image: '',
    name: '',
    quantity: 0,
    brandImage: '',
    brand: '',
    statusesId: '',
    typesId: '',
    price: 0,
  });
  const debouncedSearchTerm = useDebounce<Filter>(filter, 500);

  /**
   * @description function handle product modal
   */
  const handleToggleProductModal = () => {
    setOpenProductModal((prev) => !prev);
  };

  /**
   * @description function handle error modal
   */
  const handleToggleErrorModal = (message?: string) => {
    setOpenErrorModal({
      status: !!message,
      message: message || '',
    });
  };

  /**
   * @description function handle notification modal
   */
  const handleToggleNotificationModal = () => {
    setOpenNotificationModal((prev) => !prev);
  };

  /**
   * @description function handle new product modal
   */
  const handleToggleNewProductModal = () => {
    setOpenNewProductModal((prev) => !prev);
  };

  /**
   * @description function set product to product state
   *
   * @param {Object} item is product item
   */
  const handleSetProductItem = useCallback((item: Product) => {
    setProductItem(item);
  }, []);

  const handleConfirmAddNew = () => {};

  const handleConfirmUpdate = () => {};

  /**
   * @description function get value search when input change value
   *
   * @param {ChangeEvent} e is event of input
   */
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name) {
      setFilter((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }, []);

  /**
   * @description function shows the product modal
   *  and set information of the product in it
   *
   * @param {Object} item is data item after call api
   */
  const handleDataModal = useCallback((item: Product) => {
    handleToggleProductModal();
    handleSetProductItem(item);
  }, []);

  /**
   * @description function delete of confirm modal
   *
   * @param {String} id is id of product which is selected
   */
  const handleConfirm = useCallback(
    async (id: string) => {
      const product = await deleteProduct(id);

      if (typeof product === 'string') {
        handleToggleErrorModal(product);
      } else if (openProductModal) {
        handleToggleProductModal();
      } else {
      }
    },
    [openProductModal],
  );

  /**
   * @description function cancel/ close errors modal
   */
  const handleCancel = useCallback(() => {
    handleToggleErrorModal();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const listTypes = await getTypes();
      const listStatus = await getStatuses();

      if (typeof listStatus === 'string') {
        handleToggleErrorModal(listStatus);
      } else {
        setTypes(listStatus);
      }

      if (typeof listTypes === 'string') {
        handleToggleErrorModal(listTypes);
      } else {
        setStatuses(listTypes);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let param = '&';
    for (const [key, value] of Object.entries(debouncedSearchTerm)) {
      if (value) {
        param += `${key}_like=${value}&`;
      }
    }

    const fetchData = async () => {
      const listProducts = await getProductsByParam(param);

      if (typeof listProducts === 'string') {
        handleToggleErrorModal(listProducts);
      } else {
        setProducts(listProducts);
      }
    };

    fetchData();
  }, [debouncedSearchTerm]);

  return (
    <main className='main-wrapper'>
      <div className='main-header'>
        <Button
          label='Add New Product'
          variant='secondary'
          color='success'
          size='md'
          onClick={handleToggleNewProductModal}
        />
      </div>
      <div className='main-content'>
        <ProductTable
          filters={filter}
          products={products}
          statuses={statuses}
          types={types}
          onSearch={handleSearch}
          onEdit={handleDataModal}
          onSetProductItem={handleSetProductItem}
          onToggleNotification={handleToggleNotificationModal}
        />
      </div>
      {openNewProductModal && (
        <ProductModal
          titleModal='Add new product'
          statuses={statuses}
          types={types}
          onToggleProductModal={handleToggleNewProductModal}
          onToggleErrorModal={handleToggleErrorModal}
          onConfirm={handleConfirmAddNew}
        />
      )}
      {openProductModal && (
        <ProductModal
          titleModal='Product information'
          productItem={productItem}
          statuses={statuses}
          types={types}
          onToggleProductModal={handleToggleProductModal}
          onToggleErrorModal={handleToggleErrorModal}
          onConfirm={handleConfirmUpdate}
        />
      )}
      {openNotificationModal && (
        <NotificationModal
          url='/icons/trash-icon.svg'
          title='Delete product'
          description='Are you sure you want to delete this product? This action cannot be undone.'
          onCancel={handleToggleNotificationModal}
        >
          <Button
            label='Cancel'
            variant='secondary'
            color='default'
            size='lg'
            onClick={handleToggleNotificationModal}
          />
          <Button label='Delete' variant='tertiary' color='warning' size='lg' />
        </NotificationModal>
      )}
      {openErrorModal.status && (
        <NotificationModal
          url='/icons/error-icon.svg'
          title='Ooops!'
          description={`Something went wrong. ${openErrorModal.message}`}
          onCancel={handleCancel}
        >
          <Button
            label='Close'
            variant='tertiary'
            color='warning'
            size='lg'
            onClick={handleCancel}
          />
        </NotificationModal>
      )}
    </main>
  );
};

export default HomeLayout;
