import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';

// Services
import { getTypes, getStatuses, deleteProduct, getProductsByParam } from '@services';

// Contexts
import { ModalContext } from '@contexts';

// Hooks
import { useDebounce } from '@hooks';

// Interfaces
import { Product } from '@interfaces';

// Components
import { SelectItemProps, Button, NotificationModal } from '@components';

// Components of page
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
    itemModal,
    notificationModal,
    errorsModal,
    showHideNotificationModal,
    showHideItemModal,
    showHideErrorsModal,
  } = useContext(ModalContext);
  const [status, setStatus] = useState<SelectItemProps[]>([]);
  const [types, setTypes] = useState<SelectItemProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [flagProductUpdate, setFlagProductUpdate] = useState<boolean>(false);
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
   * @description flags to check if the data after
   * editing and deleting has been changed or not
   */
  const handleProductUpdate = useCallback(() => {
    setFlagProductUpdate((prev) => !prev);
  }, []);

  /**
   * @description function set product to product state
   *
   * @param {Object} item is product item
   */
  const handleSetProductItem = useCallback((item: Product) => {
    setProductItem(item);
  }, []);

  /**
   * @description function get value search when input change value
   *
   * @param {ChangeEvent} e is event of input
   */
  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  const handleDataModal = useCallback((item: Product) => {
    showHideItemModal();
    handleSetProductItem(item);
  }, []);

  /**
   * @description function delete of confirm modal
   *
   * @param {String} id is id of product which is selected
   */
  const handleConfirm = useCallback(
    async (id: string) => {
      const product = await deleteProduct<Product>(id);

      if ('messageError' in product) {
        showHideErrorsModal(product.messageError);
      } else if (itemModal) {
        showHideItemModal();
        showHideNotificationModal();
      } else {
        showHideNotificationModal();
      }
      handleProductUpdate();
    },
    [itemModal],
  );

  /**
   * @description function cancel/ close errors modal
   */
  const handleCancel = useCallback(() => {
    showHideErrorsModal();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const listTypes = await getTypes<SelectItemProps>();
      const listStatus = await getStatuses<SelectItemProps>();

      if ('messageError' in listTypes && !Array.isArray(listTypes)) {
        showHideErrorsModal(listTypes.messageError);
      } else {
        setTypes(listTypes);
      }

      if ('messageError' in listStatus && !Array.isArray(listStatus)) {
        showHideErrorsModal(listStatus.messageError);
      } else {
        setStatus(listStatus);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let param = '&';
    for (const [key, value] of Object.entries(debouncedSearchTerm)) {
      if (value) {
        param += `${key}_like=${value}&`;
      }
    }

    const fetchData = async () => {
      const listProduct = await getProductsByParam<Product>(param);

      if ('messageError' in listProduct) {
        showHideErrorsModal(listProduct.messageError);
      } else {
        setProducts(listProduct);
      }
    };

    fetchData();
  }, [flagProductUpdate, debouncedSearchTerm]);

  return (
    <main className='main-wrapper'>
      <ProductTable
        filters={filter}
        products={products}
        status={status}
        types={types}
        onSearch={handleSearch}
        onEdit={handleDataModal}
        onSetProductItem={handleSetProductItem}
      />
      {itemModal && (
        <ProductModal
          productItem={productItem}
          statuses={status}
          types={types}
          flagProductUpdate={handleProductUpdate}
        />
      )}
      {notificationModal && (
        <NotificationModal
          url='/icons/trash-icon.svg'
          title='Delete product'
          description='Are you sure you want to delete this product? This action cannot be undone.'
          onCancel={showHideNotificationModal}
        >
          <Button label='Cancel' variant='secondary' color='default' size='lg' />
          <Button label='Delete' variant='tertiary' color='warning' size='lg' />
        </NotificationModal>
      )}
      {errorsModal.status && (
        <NotificationModal
          url='/icons/trash-icon.svg'
          title='Ooops!'
          description={`Something went wrong. ${errorsModal.message}`}
          onCancel={handleCancel}
        >
          <Button label='Close' variant='tertiary' color='warning' size='lg' />
        </NotificationModal>
      )}
    </main>
  );
};

export default HomeLayout;
