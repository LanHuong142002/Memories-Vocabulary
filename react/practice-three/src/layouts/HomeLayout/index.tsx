import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';

// Contexts
import { ProductContext } from '@contexts';

// Helpers
import { generateSearchParam } from '@helpers';

// Hooks
import { useDebounce, useStatus, useType } from '@hooks';

// Interfaces
import { Product } from '@interfaces';

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
  const {
    products,
    onAddProduct,
    onDeleteProduct,
    onUpdateProduct,
    onSearchProducts,
    onUpdateErrorMessage,
    errorMessage,
  } = useContext(ProductContext);
  const { data: statuses, error: errorStatus } = useStatus();
  const { data: types, error: errorType } = useType();
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
  const debouncedSearchTerm = useDebounce<Filter>(filter, 1000);

  /**
   * @description function handle product modal
   */
  const handleToggleProductModal = useCallback((): void => {
    setOpenProductModal((prev) => !prev);
  }, []);

  /**
   * @description function handle error modal
   */
  const handleToggleErrorModal = useCallback((message?: string): void => {
    setOpenErrorModal({
      status: !!message,
      message: message || '',
    });
  }, []);

  /**
   * @description function handle notification modal
   */
  const handleToggleNotificationModal = useCallback((): void => {
    setOpenNotificationModal((prev) => !prev);
  }, []);

  /**
   * @description function handle new product modal
   */
  const handleToggleNewProductModal = useCallback((): void => {
    setOpenNewProductModal((prev) => !prev);
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
    const newProduct = {
      ...product,
      id: product.id || crypto.randomUUID(),
    };

    onAddProduct(newProduct);
  }, []);

  /**
   * @description function handle confirm update a product of product modal
   *
   * @param {Object} product is a product updated
   */
  const handleConfirmUpdate = useCallback((product: Product): void => {
    onUpdateProduct(product);
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
    onSearchProducts(generateSearchParam(debouncedSearchTerm));
  }, [debouncedSearchTerm, onSearchProducts]);

  useEffect(() => {
    if (errorStatus) onUpdateErrorMessage(errorStatus);
    if (errorType) onUpdateErrorMessage(errorType);
    if (errorMessage) handleToggleErrorModal(errorMessage);
  }, [errorStatus, errorType, errorMessage]);

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
          products={products || []}
          statuses={statuses || []}
          types={types || []}
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
          <Button
            label='Delete'
            variant='tertiary'
            color='warning'
            size='lg'
            onClick={handleConfirmDelete}
          />
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
