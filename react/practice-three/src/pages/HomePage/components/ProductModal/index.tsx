import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';

// Constants
import { MOCK_PRODUCT_DATA } from '@constants';

// Helpers
import { convertBase64, validateStringField, validateNumberField, loadImage } from '@helpers';

// Hooks
import { useDebounce } from '@hooks';

// Interfaces
import { Product, ProductStatus, ProductType } from '@interfaces';

// Components
import { Modal, Button, Image, Input, Select, InputFile } from '@components';

// Styles
import './index.css';

interface ModalProps {
  titleModal: string;
  statuses: ProductStatus[];
  types: ProductType[];
  productItem?: Product;
  onToggleProductModal: () => void;
  onConfirm: (product: Product) => void;
}

export const ProductModal = ({
  titleModal,
  productItem,
  statuses,
  types,
  onToggleProductModal,
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
      statusesId: MOCK_PRODUCT_DATA.statusesId,
      typesId: MOCK_PRODUCT_DATA.typesId,
      price: 0,
    },
  );
  const [shouldValidateForm, setShouldValidateForm] = useState<boolean>(false);
  const debouncedProduct = useDebounce<Product>(product, 1000);

  /**
   * @description function get value when input change their value
   *
   * @param {ChangeEvent} e is event of input or select
   */
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
    async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const name = e.target.name;
      const [file] = e.target.files || [];

      if (file) {
        const image = await convertBase64(file);

        if (image) {
          setProduct({
            ...product,
            [name]: image,
          });
        }
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
  const handleOnConfirm = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      onConfirm(product);
      onToggleProductModal();
    },
    [product],
  );

  /**
   * @description function check if form have any errors the button
   * will disabled
   *
   * @returns {string}
   */
  const disabledButton = (): string => {
    return (
      validateStringField(debouncedProduct.brandImage) ||
      validateStringField(debouncedProduct.image) ||
      validateNumberField(Number(product.price)) ||
      validateStringField(product.name) ||
      validateNumberField(Number(product.quantity), 'quantity') ||
      validateStringField(product.brand)
    );
  };

  return useMemo(
    () => (
      <Modal title={titleModal} toggleModal={onToggleProductModal}>
        <form className='form-wrapper' onSubmit={handleOnConfirm}>
          <div className='form-body'>
            <div className='form-image'>
              <div className='form-image-wrapper'>
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
              <span className='error-message'>
                {shouldValidateForm && validateStringField(debouncedProduct.image)}
              </span>
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
                  <div className='image-wrapper-content'>
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
                  <span className='error-message'>
                    {shouldValidateForm && validateStringField(debouncedProduct.brandImage)}
                  </span>
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
              onClick={onToggleProductModal}
            />
            <Button
              variant='tertiary'
              color='success'
              label='Confirm'
              type='submit'
              isDisabled={!!disabledButton()}
            />
          </div>
        </form>
      </Modal>
    ),
    [debouncedProduct, product, statuses, types],
  );
};
