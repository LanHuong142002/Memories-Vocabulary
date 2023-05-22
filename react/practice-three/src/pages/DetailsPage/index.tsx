import { ChangeEvent, useCallback, useEffect, useState } from 'react';

// Helpers
import { convertBase64, loaderImage, validation } from '@helpers';

// Interfaces
import { DataProduct } from '@interfaces';

// Components
import { Button, Image, Input, InputFile, Select, SelectItemProps, Typography } from '@components';

// CSS
import './index.css';

type ErrorMessage = Pick<DataProduct, 'name' | 'quantity' | 'brand' | 'price'>;

const DetailsPage = () => {
  const [product, setProduct] = useState({
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
  const [status, setStatus] = useState<SelectItemProps[]>([]);
  const [types, setTypes] = useState<SelectItemProps[]>([]);
  const [isErrors, setIsErrors] = useState<boolean>(true);
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
  const handleOnSave = () => {
    console.log('save');
  };

  const handleOnBack = () => {
    console.log('back');
  };

  /**
   * @description validation input onChange
   */
  useEffect(() => {
    const errors = validation<ErrorMessage>(product, ['price', 'quantity']);
    setErrorsMessage(errors);

    // if input still have any errors, isErrors will set to false to disable button save
    // if no more errors, isErrors will set to true and show button save
    if (Object.values(errors).every((value) => !value)) {
      setIsErrors(false);
    } else {
      setIsErrors(true);
    }
  }, [product]);

  return (
    <main className='details-page'>
      <div className='details-title'>
        <Typography text='Product' tagName='h2' color='quaternary' size='lg' weight='bold' />
      </div>
      <div className='details-body'>
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
                    url={loaderImage('/icons/upload-cloud.svg')}
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
              isDisabled={isErrors}
            />
          </div>
        </form>
        <div className='details-aside'>
          <div className='image-wrapper'>
            <Image url='' alt='product image' size='xxl' />
          </div>
          <InputFile
            id='image'
            name='image'
            text='Click to update'
            url={loaderImage('/icons/upload-icon.svg')}
            size='md'
            onChange={handleChangeInputFile}
          />
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
