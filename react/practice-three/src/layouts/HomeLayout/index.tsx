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

interface ErrorModal {
  status: boolean;
  message: string;
}

const HomeLayout = () => {
  const [productModal, setProductModal] = useState<boolean>(false);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);
  const [newProductModal, setNewProductModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<ErrorModal>({
    status: false,
    message: '',
  });

  const [status, setStatus] = useState<ProductStatus[]>([]);
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
  const handleProductModal = () => {
    setProductModal((prev) => !prev);
  };

  /**
   * @description function handle error modal
   */
  const handleErrorModal = (message?: string) => {
    setErrorModal({
      status: message ? true : false,
      message: message || '',
    });
  };

  /**
   * @description function handle notification modal
   */
  const handleNotificationModal = () => {
    setNotificationModal((prev) => !prev);
  };

  /**
   * @description function handle new product modal
   */
  const handleNewProductModal = () => {
    setNewProductModal((prev) => !prev);
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
    handleProductModal();
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
        handleErrorModal(product);
      } else if (productModal) {
        handleProductModal();
      } else {
      }
    },
    [productModal],
  );

  /**
   * @description function cancel/ close errors modal
   */
  const handleCancel = useCallback(() => {
    handleErrorModal();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const listTypes = await getTypes();
      const listStatus = await getStatuses();

      if (typeof listStatus === 'string') {
        handleErrorModal(listStatus);
      } else {
        setTypes(listStatus);
      }

      if (typeof listTypes === 'string') {
        handleErrorModal(listTypes);
      } else {
        setStatus(listTypes);
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
        handleErrorModal(listProducts);
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
          onClick={handleNewProductModal}
        />
      </div>
      <div className='main-content'>
        <ProductTable
          filters={filter}
          products={products}
          status={status}
          types={types}
          onSearch={handleSearch}
          onEdit={handleDataModal}
          onSetProductItem={handleSetProductItem}
          onHandleNotification={handleNotificationModal}
        />
      </div>
      {newProductModal && (
        <ProductModal
          titleModal='Add new product'
          statuses={status}
          types={types}
          onHandleProductModal={handleNewProductModal}
          onHandleErrorModal={handleErrorModal}
          onConfirm={handleConfirmAddNew}
        />
      )}
      {productModal && (
        <ProductModal
          titleModal='Product information'
          productItem={productItem}
          statuses={status}
          types={types}
          onHandleProductModal={handleProductModal}
          onHandleErrorModal={handleErrorModal}
          onConfirm={handleConfirmUpdate}
        />
      )}
      {notificationModal && (
        <NotificationModal
          url='/icons/trash-icon.svg'
          title='Delete product'
          description='Are you sure you want to delete this product? This action cannot be undone.'
          onCancel={handleNotificationModal}
        >
          <Button
            label='Cancel'
            variant='secondary'
            color='default'
            size='lg'
            onClick={handleNotificationModal}
          />
          <Button label='Delete' variant='tertiary' color='warning' size='lg' />
        </NotificationModal>
      )}
      {errorModal.status && (
        <NotificationModal
          url='/icons/error-icon.svg'
          title='Ooops!'
          description={`Something went wrong. ${errorModal.message}`}
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
