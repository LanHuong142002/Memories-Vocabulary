import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// Services
import { getTypes, getStatuses, deleteProduct, getProductsByParam } from '@services';

// Hooks
import { useDebounce } from '@hooks';

// Interfaces
import { Product } from '@interfaces';

// Components
import { SelectItemProps, NotificationModal, Button } from '@components';
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
  const [errorModal, setErrorModal] = useState<ErrorModal>({
    status: false,
    message: '',
  });

  const [status, setStatus] = useState<SelectItemProps[]>([]);
  const [types, setTypes] = useState<SelectItemProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productFlag, setProductFlag] = useState<boolean>(false);
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

  const handleProductModal = () => {
    setProductModal((prev) => !prev);
  };

  const handleErrorModal = (message?: string) => {
    setErrorModal({
      status: message ? true : false,
      message: message || '',
    });
  };

  const handleNotificationModal = () => {
    setNotificationModal((prev) => !prev);
  };

  /**
   * @description flags to check if the data after
   * editing and deleting has been changed or not
   */
  const handleUpdateProductFlag = useCallback(() => {
    setProductFlag((prev) => !prev);
  }, []);

  /**
   * @description function set product to product state
   *
   * @param {Object} item is product item
   */
  const handleSetProductItem = useCallback((item: Product) => {
    setProductItem(item);
  }, []);

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
      handleUpdateProductFlag();
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
  }, [productFlag, debouncedSearchTerm]);

  return (
    <main className='main-wrapper'>
      <ProductTable
        filters={filter}
        products={products}
        status={status}
        types={types}
        onSearch={handleSearch}
        onEdit={handleDataModal}
        onSetProductItem={handleSetProductItem}
      />
      {productModal && (
        <ProductModal
          productItem={productItem}
          statuses={status}
          types={types}
          onUpdateProductFlag={handleUpdateProductFlag}
          onHandleProductModal={handleProductModal}
          onHandleErrorModal={handleErrorModal}
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
