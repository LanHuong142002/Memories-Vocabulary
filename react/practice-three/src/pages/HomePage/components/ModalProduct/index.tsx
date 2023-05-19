import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Styles
import './index.css';

// Components
import { Modal, Button, Image, Input, Select, SelectItemProps, InputFile } from '@components';

// Services
import { updateProduct } from '@services';

// Helpers
import { convertBase64, validateStringField, validateNumberField } from '@helpers';

// Contexts
import { ModalContext } from '@contexts';

// Hooks
import { useDebounce } from '@hooks';

// Interfaces
import { Product } from '@interfaces';

interface ModalProps {
  status: SelectItemProps[];
  types: SelectItemProps[];
  productItem: Product;
  onUpdateProductFlag: () => void;
}

const ModalProduct = ({ productItem, status, types, onUpdateProductFlag }: ModalProps) => {
  const { showHideItemModal, showHideErrorsModal } = useContext(ModalContext);
  const [product, setProduct] = useState<Product>(productItem);
  const [hasError, setHasError] = useState<boolean>(true);
  const debouncedProduct = useDebounce<Product>(product, 500);

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
        const item = await updateProduct<Product>(product.id, product);

        // If in the process of calling the API, it returns an object containing an error,
        // an error message will be displayed
        if ('messageError' in item) {
          showHideErrorsModal(item.messageError);

          // if don't have any errors, list products will update
        } else {
          onUpdateProductFlag();
          showHideItemModal();
        }

        // if product doesn't have any change, the modal will close
      } else if (product === productItem) {
        showHideItemModal();
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
      setHasError(false);
    } else {
      setHasError(true);
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
      <Modal toggleModal={showHideItemModal}>
        <form className='form-wrapper'>
          <div className='form-body'>
            <div className='form-aside'>
              <Image url={product.image} size='lg' />
              <InputFile
                url=''
                id='image'
                name='image'
                text='Choose File ... '
                onChange={handleChangeInputFile}
              />
            </div>
            <div className='form-content'>
              <div className='form-group'>
                <div className='form-control'>
                  <Input
                    title="Product's Name"
                    name='name'
                    variant='primary'
                    value={product.name}
                    onChange={handleOnChange}
                  />
                  <span className='error-message'>{validateStringField(product.name)}</span>
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
                    {validateNumberField(Number(product.quantity), 'quantity')}
                  </span>
                </div>
              </div>
              <div className='form-group form-group-split'>
                <div className='form-control'>
                  <Input
                    title="Brand's Name"
                    name='brand'
                    variant='primary'
                    value={String(product.brand)}
                    onChange={handleOnChange}
                  />
                  <span className='error-message'>{validateStringField(product.brand)}</span>
                </div>

                <div className='group-image'>
                  <Image size='s' isCircle={true} url={product.brandImage} />
                  <InputFile
                    url=''
                    id='brandImage'
                    name='brandImage'
                    text='Choose File ...'
                    variant='secondary'
                    onChange={handleChangeInputFile}
                  />
                </div>
              </div>
              <div className='form-group form-group-split'>
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
                    {validateNumberField(Number(product.price))}
                  </span>
                </div>

                <Select
                  title='Status'
                  options={status}
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
            </div>
          </div>
          <div className='form-cta'>
            <Button
              variant='secondary'
              color='success'
              label='Save'
              type='submit'
              isDisabled={hasError}
            />
            <Button
              variant='secondary'
              color='default'
              label='Cancel'
              type='button'
              onClick={showHideItemModal}
            />
          </div>
        </form>
      </Modal>
    );
  }, [hasError, debouncedProduct, product, status, types]);
};

export default ModalProduct;
