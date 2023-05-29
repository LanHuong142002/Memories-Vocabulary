import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Interfaces
import { Product } from '@interfaces';

// Hooks
import { useDebounce, useProductById, useStatus, useType } from '@hooks';

// Contexts
import { ProductContext } from '@contexts';

// Helpers
import { convertBase64, loadImage, validateNumberField, validateStringField } from '@helpers';

// Components
import { Button, Image, Input, InputFile, Select } from '@components';

// Styles
import './index.css';

export const DetailsBody = ({
  onErrorModal,
  product,
  onProduct,
}: {
  onErrorModal: (errorMessage: string) => void;
  onProduct: (productItem: Product) => void;
  product: Product;
}): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { errorMessage, onUpdateErrorMessage, onUpdateProduct } = useContext(ProductContext);
  const { data: statuses, error: errorStatus } = useStatus();
  const { data: types, error: errorType } = useType();
  const { data: productItem, error: errorGetProductById } = useProductById(id || '');

  const [isValidateFlag, setIsValidateFlag] = useState<boolean>(false);
  const debouncedProduct = useDebounce<Product>(product, 700);

  /**
   * @description function get value when input change their value
   *
   * @param {ChangeEvent} e is event of input or select
   */
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const name = e.target.name;
      let value: number | string;

      if (name === 'quantity' || name === 'price') {
        value = Number(e.target.value);
      } else {
        value = e.target.value;
      }

      if (name) {
        onProduct({
          ...product,
          [name]: value,
        });
      }
      setIsValidateFlag(true);
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
          onProduct({
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
  const handleOnSave = useCallback((e: FormEvent<HTMLFormElement>, productItem: Product): void => {
    e.preventDefault();
    onUpdateProduct(productItem);
  }, []);

  /**
   * @description function redirect to home page
   */
  const handleOnBack = useCallback((): void => {
    navigate('/');
  }, []);

  /**
   * @description function check if form have any errors the button
   * will disabled
   *
   * @returns {string}
   */
  const disabledButton = (): string => {
    return (
      validateNumberField(Number(product.price)) ||
      validateStringField(product.name) ||
      validateNumberField(Number(product.quantity), 'quantity') ||
      validateStringField(product.brand)
    );
  };

  useEffect(() => {
    if (productItem) {
      onProduct(productItem);
    }
  }, [productItem]);

  useEffect(() => {
    if (errorStatus) onUpdateErrorMessage(errorStatus);
    if (errorType) onUpdateErrorMessage(errorType);
    if (errorGetProductById) onUpdateErrorMessage(errorGetProductById);

    if (errorMessage) onErrorModal(errorMessage);
  }, [errorStatus, errorType, errorMessage, errorGetProductById]);

  return (
    <>
      <form className='form-wrapper' onSubmit={handleOnSave}>
        <div className='form-body'>
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
                {isValidateFlag && validateStringField(debouncedProduct.name)}
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
                {isValidateFlag &&
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
                {isValidateFlag && validateNumberField(Number(debouncedProduct.price))}
              </span>
            </div>
          </div>
          <div className='form-group form-group-split'>
            <Select
              title='Status'
              options={statuses || []}
              name='statusesId'
              valueSelected={product.statusesId || ''}
              onChange={handleOnChange}
            />
            <Select
              title='Types'
              options={types || []}
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
                {isValidateFlag && validateStringField(debouncedProduct.brand)}
              </span>
            </div>
            <div className='group-image'>
              <p>Brand Image</p>
              <div className='image-wrapper'>
                <Image size='s' isCircle={true} url={product.brandImage} />
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

        <div className='form-cta-details'>
          <Button
            variant='secondary'
            color='default'
            label='Back'
            type='button'
            onClick={handleOnBack}
          />
          <Button
            variant='tertiary'
            color='success'
            label='Save'
            type='submit'
            isDisabled={!!disabledButton()}
          />
        </div>
      </form>
      <div className='details-aside'>
        <div className='image-wrapper'>
          <Image url={product.image} alt='product image' size='xxl' />
        </div>
        <InputFile
          id='image'
          name='image'
          text='Click to update'
          url={loadImage('/icons/upload-icon.svg')}
          size='md'
          onChange={handleChangeInputFile}
        />
      </div>
    </>
  );
};
