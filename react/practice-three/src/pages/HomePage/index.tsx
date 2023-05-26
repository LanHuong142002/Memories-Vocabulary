// Layouts
import { Header, HomeLayout } from '@layouts';

// Components
import { ReactElement, useCallback, useContext, useEffect, useState } from 'react';

// Interfaces
import { Product } from '@interfaces';

// Contexts
import { ProductContext } from '@contexts';

// Hooks
import { useStatus, useType } from '@hooks';

// Components
import { ProductModal, HomeBody } from '@pages';
import { Button, NotificationModal } from '@components';

export const HomePage = (): ReactElement => {
  const { onAddProduct, onDeleteProduct, onUpdateProduct, onUpdateErrorMessage, errorMessage } =
    useContext(ProductContext);
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
  const handleProductItem = useCallback((item: Product): void => {
    setProductItem(item);
  }, []);

  /**
   * @description function shows the product modal
   *  and set information of the product in it
   *
   * @param {Object} item is data item after call api
   */
  const handleDataModal = useCallback((item: Product): void => {
    handleToggleProductModal();
    handleProductItem(item);
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
    if (errorStatus) onUpdateErrorMessage(errorStatus);
    if (errorType) onUpdateErrorMessage(errorType);

    if (errorMessage) handleToggleErrorModal(errorMessage);
  }, [errorStatus, errorType, errorMessage]);

  return (
    <>
      <Header />
      <HomeLayout
        homeHeader={
          <Button
            label='Add New Product'
            variant='secondary'
            color='success'
            size='md'
            onClick={handleToggleNewProductModal}
          />
        }
        homeBody={
          <HomeBody
            statuses={statuses}
            types={types}
            onDataModal={handleDataModal}
            onProductItem={handleProductItem}
            onToggleNotificationModal={handleToggleNotificationModal}
          />
        }
      />
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
    </>
  );
};
