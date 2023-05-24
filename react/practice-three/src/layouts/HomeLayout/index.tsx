import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';

// Contexts
import { ProductContext } from '@contexts';

// Hooks
import { useDebounce, useStatus, useType } from '@hooks';

// Interfaces
import { Product } from '@interfaces';

// Components
import { NotificationModal, Button } from '@components';
import { ProductTable, ProductModal } from '@pages';

// Styles
import './index.css';
import { generateSearchParam } from '@helpers';

interface Filter {
  name: string;
  statusesId: string;
  typesId: string;
  quantity: string;
  brand: string;
  price: string;
}

const HomeLayout = () => {
  const {
    products,
    messageError,
    onSearchProducts,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
    onSetMessageError,
  } = useContext(ProductContext);
  const { data: status, error: errorStatus } = useStatus();
  const { data: types, error: errorType } = useType();
  const [productModal, setProductModal] = useState<boolean>(false);
  const [notificationModal, setNotificationModal] = useState<boolean>(false);
  const [newProductModal, setNewProductModal] = useState<boolean>(false);
  const [errorModal, setErrorModal] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: '',
  });
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
  const handleToggleProductModal = useCallback((): void => {
    setProductModal((prev) => !prev);
  }, []);

  /**
   * @description function handle error modal
   */
  const handleToggleErrorModal = useCallback((message?: string): void => {
    setErrorModal({
      status: !!message,
      message: message || '',
    });
  }, []);

  /**
   * @description function handle notification modal
   */
  const handleToggleNotificationModal = useCallback((): void => {
    setNotificationModal((prev) => !prev);
  }, []);

  /**
   * @description function handle new product modal
   */
  const handleToggleNewProductModal = useCallback((): void => {
    setNewProductModal((prev) => !prev);
  }, []);

  /**
   * @description function set product to product state
   *
   * @param {Object} item is product item
   */
  const handleSetProductItem = useCallback((item: Product): void => {
    setProductItem(item);
  }, []);

  /**
   * @description function handle confirm add new product of new product modal
   *
   * @param {Object} product is a new product
   */
  const handleConfirmAddNew = useCallback((product: Product): void => {
    console.log('product', product);
  }, []);

  /**
   * @description function handle confirm update a product of product modal
   *
   * @param {Object} product is a product updated
   */
  const handleConfirmUpdate = useCallback((product: Product): void => {
    console.log('product', product);
  }, []);

  /**
   * @description function get value search when input change value
   *
   * @param {ChangeEvent} e is event of input
   */
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
  const handleDataModal = useCallback((item: Product): void => {
    handleToggleProductModal();
    handleSetProductItem(item);
  }, []);

  /**
   * @description function delete of confirm modal
   *
   * @param {String} id is id of product which is selected
   */
  const handleConfirmDelete = useCallback(async (): Promise<void> => {
    if (productItem && productItem.id) {
      onDeleteProduct(productItem.id);
      handleToggleNotificationModal();
    }
  }, [productItem]);

  /**
   * @description function cancel/ close errors modal
   */
  const handleCancel = useCallback((): void => {
    handleToggleErrorModal();
  }, []);

  useEffect(() => {
    const param = generateSearchParam(debouncedSearchTerm);
    onSearchProducts(param);
  }, [filter, debouncedSearchTerm, messageError]);

  useEffect(() => {
    if (errorStatus) onSetMessageError(errorStatus);
    if (errorType) onSetMessageError(errorType);
    if (messageError) handleToggleErrorModal(messageError);
  }, [errorStatus, errorType, messageError]);

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
          products={products ? products : []}
          status={status ? status : []}
          types={types ? types : []}
          onSearch={handleSearch}
          onEdit={handleDataModal}
          onSetProductItem={handleSetProductItem}
          onHandleToggleNotification={handleToggleNotificationModal}
        />
      </div>
      {newProductModal && (
        <ProductModal
          titleModal='Add new product'
          statuses={status}
          types={types}
          onHandleToggleProductModal={handleToggleNewProductModal}
          onHandleToggleErrorModal={handleToggleErrorModal}
          onConfirm={handleConfirmAddNew}
        />
      )}
      {productModal && (
        <ProductModal
          titleModal='Product information'
          productItem={productItem}
          statuses={status}
          types={types}
          onHandleToggleProductModal={handleToggleProductModal}
          onHandleToggleErrorModal={handleToggleErrorModal}
          onConfirm={handleConfirmUpdate}
        />
      )}
      {notificationModal && (
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
          <Button
            label='Delete'
            variant='tertiary'
            color='warning'
            size='lg'
            onClick={handleConfirmDelete}
          />
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
