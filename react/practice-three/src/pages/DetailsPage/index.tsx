import { ReactElement, useCallback, useState } from 'react';

// Interfaces
import { Product } from '@interfaces';

// Layouts
import { DetailsLayout } from '@layouts';

// Layouts
import { Button, NotificationModal, Typography } from '@components';
import { DetailsBody } from '@pages';

export const DetailsPage = (): ReactElement => {
  const [errorModal, setErrorModal] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: '',
  });
  const [product, setProduct] = useState<Product>({
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
   * @description function set product state
   *
   * @param {Object} productItem
   */
  const handleSetProduct = (productItem: Product) => {
    setProduct(productItem);
  };

  /**
   * @description function handle error modal
   */
  const handleOpenErrorModal = useCallback((message?: string): void => {
    setErrorModal({
      status: message ? true : false,
      message: message || '',
    });
  }, []);

  /**
   * @description function cancel/ close errors modal
   */
  const handleCancel = useCallback((): void => {
    handleOpenErrorModal();
  }, []);

  return (
    <>
      <DetailsLayout
        title={
          <Typography text={product.name} tagName='h2' color='quaternary' size='lg' weight='bold' />
        }
      >
        <DetailsBody
          product={product}
          onOpenErrorModal={handleOpenErrorModal}
          onSetProduct={handleSetProduct}
        />
      </DetailsLayout>
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
    </>
  );
};
