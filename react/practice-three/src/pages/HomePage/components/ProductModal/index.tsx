import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

// Styles
import './index.css';

// Components
import { Modal, Button, Image, Input, Select, InputFile } from '@components';

// Services
import { updateProduct } from '@services';

// Helpers
import { convertBase64, validateStringField, validateNumberField, loadImage } from '@helpers';

// Hooks
import { useDebounce } from '@hooks';

// Interfaces
import { Product, ProductStatus, ProductType } from '@interfaces';

interface ModalProps {
  titleModal: string;
  statuses: ProductStatus[];
  types: ProductType[];
  productItem?: Product;
  onToggleProductModal: () => void;
  onToggleErrorModal: (message?: string) => void;
  onConfirm: () => void;
}

const ProductModal = ({
  titleModal,
  productItem,
  statuses,
  types,
  onToggleProductModal,
  onToggleErrorModal,
  onConfirm,
}: ModalProps): React.ReactElement => {
  const [product, setProduct] = useState<Product>(
    productItem || {
      id: '',
      image: '',
      name: '',
      quantity: 0,
      brandImage: '',
      brand: '',
      statusesId: '',
      typesId: '',
      price: 0,
    },
  );
  const [hasError, setHasError] = useState<boolean>(true);
  const [shouldValidateForm, setShouldValidateForm] = useState<boolean>(false);
  const debouncedProduct = useDebounce<Product>(product, 1000);

  /**
   * @description function get value when input change their value
   *
   * @param {ChangeEvent} e is event of input or select
   */
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      if (name) {
        setProduct({
          ...product,
          [name]: value,
        });
      }
      setShouldValidateForm(true);
    },
    [product],
  );

  /**
   * @description function get file when value of input file change
   *
   * @param {ChangeEvent} e is event of input file
   */
  const handleChangeInputFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const [file] = e.target.files || [];

      if (file) {
        const image = await convertBase64(file);

        setProduct({
          ...product,
          [name]: image,
        });
      }
    },
    [product],
  );

  /**
   * @description function that saves the data taken from the inputs
   *  and calls the API after pressing submit of the modal form
   *
   * @param {SubmitEvent} e is submit event of form
   */
  const handleOnSave = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // if have product's id and product has any change, we will call API to update product
      if (product.id && product !== productItem) {
        const productItem = await updateProduct(product);

        // If in the process of calling the API, it returns an object containing an error,
        // an error message will be displayed
        if (typeof productItem === 'string') {
          onToggleErrorModal(productItem);

          // if don't have any errors, list products will update
        } else {
          onToggleProductModal();
        }

        // if product doesn't have any change, the modal will close
      } else if (product === productItem) {
        onToggleProductModal();
      }
    },
    [product, productItem],
  );

  const disabledButton = () => {
    if (
      validateNumberField(Number(product.price)) ||
      validateStringField(product.name) ||
      validateNumberField(Number(product.quantity), 'quantity') ||
      validateStringField(product.brand)
    ) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  /**
   * @description validation input onChange
   */
  useEffect(() => {
    disabledButton();
  }, [product.price, product.name, product.quantity, product.brand]);

  return useMemo(() => {
    return (
      <Modal title={titleModal} toggleModal={onToggleProductModal}>
        <form className='form-wrapper' onSubmit={onConfirm}>
          <div className='form-body'>
            <div className='form-image'>
              <Image
                url={product.image || loadImage('/images/default-image.png')}
                alt='image'
                size='xl'
                isCircle={true}
              />
              <InputFile
                url={loadImage('/icons/upload-icon.svg')}
                size='md'
                variant='primary'
                id='image'
                name='image'
                text='Click to upload'
                onChange={handleChangeInputFile}
              />
            </div>

            <div className='form-group'>
              <div className='form-control'>
                <Input
                  title='Name'
                  name='name'
                  variant='primary'
                  value={product.name}
                  onChange={handleOnChange}
                />
                <span className='error-message'>
                  {shouldValidateForm && validateStringField(debouncedProduct.name)}
                </span>
              </div>
            </div>

            <div className='form-group'>
              <div className='form-control'>
                <Input
                  title='Quantity'
                  name='quantity'
                  variant='primary'
                  type='number'
                  value={String(product.quantity)}
                  onChange={handleOnChange}
                />
                <span className='error-message'>
                  {shouldValidateForm &&
                    validateNumberField(Number(debouncedProduct.quantity), 'quantity')}
                </span>
              </div>
            </div>

            <div className='form-group'>
              <div className='form-control'>
                <Input
                  title='Price'
                  name='price'
                  variant='primary'
                  type='number'
                  value={String(product.price)}
                  onChange={handleOnChange}
                />
                <span className='error-message'>
                  {shouldValidateForm && validateNumberField(Number(debouncedProduct.price))}
                </span>
              </div>
            </div>
            <div className='form-group form-group-split'>
              <Select
                title='Status'
                options={statuses}
                name='statusesId'
                valueSelected={product.statusesId || ''}
                onChange={handleOnChange}
              />

              <Select
                title='Types'
                options={types}
                name='typesId'
                valueSelected={product.typesId || ''}
                onChange={handleOnChange}
              />
            </div>

            <div className='form-group form-group-split'>
              <div className='form-control'>
                <Input
                  title='Brand'
                  name='brand'
                  variant='primary'
                  value={product.brand}
                  onChange={handleOnChange}
                />
                <span className='error-message'>
                  {shouldValidateForm && validateStringField(debouncedProduct.brand)}
                </span>
              </div>

              <div className='group-image'>
                <p>Brand Image</p>
                <div className='image-wrapper'>
                  <Image
                    size='s'
                    isCircle={true}
                    url={product.brandImage || loadImage('/images/default-image.png')}
                  />
                  <InputFile
                    url={loadImage('/icons/cloud-icon.svg')}
                    id='brandImage'
                    name='brandImage'
                    text='Upload photo'
                    variant='secondary'
                    size='xxs'
                    onChange={handleChangeInputFile}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='form-cta'>
            <Button
              variant='secondary'
              color='default'
              label='Cancel'
              type='button'
              onClick={onConfirm}
            />
            <Button
              variant='tertiary'
              color='success'
              label='Confirm'
              type='submit'
              isDisabled={hasError}
            />
          </div>
        </form>
      </Modal>
    );
  }, [hasError, debouncedProduct, product, statuses, types]);
};

export default ProductModal;
