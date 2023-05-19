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
import { validation, convertBase64, loadImage } from '@helpers';

// Contexts
import { ModalContext } from '@contexts';

// Interfaces
import { Product } from '@interfaces';

interface ModalProps {
  statuses: SelectItemProps[];
  types: SelectItemProps[];
  productItem: Product;
  flagProductUpdate: () => void;
}

type ErrorMessage = Pick<Product, 'name' | 'quantity' | 'brand' | 'price'>;

const ProductModal = ({
  productItem,
  statuses,
  types,
  flagProductUpdate,
}: ModalProps): React.ReactElement => {
  const { showHideItemModal, showHideErrorsModal } = useContext(ModalContext);
  const [product, setProduct] = useState<Product>(productItem);
  const [hasErrors, setHasErrors] = useState<boolean>(true);
  const [errorsMessage, setErrorsMessage] = useState<ErrorMessage>({
    name: '',
    quantity: '',
    brand: '',
    price: '',
  });

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
          flagProductUpdate();
          showHideItemModal();
        }

        // if product doesn't have any change, the modal will close
      } else if (product === productItem) {
        showHideItemModal();
      }
    },
    [product, productItem],
  );

  /**
   * @description validation input onChange
   */
  useEffect(() => {
    const errors = validation<ErrorMessage>(product, ['price', 'quantity']);
    setErrorsMessage(errors);
    setHasErrors(!Object.values(errors).every((value) => !value));
  }, [product]);

  return useMemo(() => {
    return (
      <Modal title='Product information' toggleModal={showHideItemModal}>
        <form className='form-wrapper' onSubmit={handleOnSave}>
          <div className='form-body'>
            <div className='form-image'>
              <Image url={product.image} alt='image' size='xl' isCircle={true} />
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
                <span className='error-message'>{errorsMessage.name}</span>
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
                <span className='error-message'>{errorsMessage.quantity}</span>
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
                <span className='error-message'>{errorsMessage.price}</span>
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
                <span className='error-message'>{errorsMessage.brand}</span>
              </div>

              <div className='group-image'>
                <p>Brand Image</p>
                <div className='image-wrapper'>
                  <Image size='s' isCircle={true} url={product.brandImage} />
                  <InputFile
                    url={loadImage('/icons/upload-cloud.svg')}
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
              onClick={showHideItemModal}
            />
            <Button
              variant='tertiary'
              color='success'
              label='Confirm'
              type='submit'
              isDisabled={hasErrors}
            />
          </div>
        </form>
      </Modal>
    );
  }, [product, errorsMessage, status, types]);
};

export default ProductModal;
