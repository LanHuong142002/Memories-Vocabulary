import { ChangeEvent, ReactElement, useCallback, useContext, useEffect, useState } from 'react';

// Interfaces
import { Product, ProductStatus, ProductType } from '@interfaces';

// Hooks
import { useDebounce } from '@hooks';

// Helpers
import { generateSearchParam } from '@helpers';

// Contexts
import { ProductContext } from '@contexts';

// Components
import { ProductTable } from '@pages';

interface Filter {
  name: string;
  statusesId: string;
  typesId: string;
  quantity: string;
  brand: string;
  price: string;
}

interface HomeBodyProps {
  statuses: ProductStatus[];
  types: ProductType[];
  onDataModal: (product: Product) => void;
  onProductItem: (product: Product) => void;
  onToggleNotificationModal: () => void;
}

export const HomeBody = ({
  statuses,
  types,
  onDataModal,
  onProductItem,
  onToggleNotificationModal,
}: HomeBodyProps): ReactElement => {
  const { products, onSearchProducts } = useContext(ProductContext);
  const [filter, setFilter] = useState<Filter>({
    name: '',
    statusesId: '',
    typesId: '',
    quantity: '',
    brand: '',
    price: '',
  });
  const debouncedSearchTerm = useDebounce<Filter>(filter, 1000);

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

  useEffect(() => {
    onSearchProducts(generateSearchParam(debouncedSearchTerm));
  }, [debouncedSearchTerm, onSearchProducts]);

  return (
    <ProductTable
      filters={filter}
      products={products || []}
      statuses={statuses || []}
      types={types || []}
      onSearch={handleSearch}
      onEdit={onDataModal}
      onSetProductItem={onProductItem}
      onToggleNotification={onToggleNotificationModal}
    />
  );
};
