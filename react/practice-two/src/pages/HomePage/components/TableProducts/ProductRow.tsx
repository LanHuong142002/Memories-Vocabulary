import { memo, useCallback, useEffect, useRef, useState } from 'react';

// Images
import More from 'assets/icons/more.svg';

// Component
import {
  TableCell,
  TableRow,
  Identity,
  Image,
  Label,
  Typography,
  SelectItemProps,
} from '@components';
import { formatPrice } from 'helpers/convert';

// Components of pages
import { ActionMenu } from '@pages';

interface DataProduct {
  id?: string;
  productImage: string;
  productName: string;
  status?: string;
  type?: string;
  quantity: number | string;
  brandImage: string;
  brandName: string;
  price: number | string;
  statusesId?: string;
  typesId?: string;
  statuses?: SelectItemProps;
  types?: SelectItemProps;
}

interface ProductRowProps extends DataProduct {
  onEdit: (item: DataProduct) => void;
  handleSetProductItem: (item: DataProduct) => void;
}

const ProductRow = ({
  id,
  productImage,
  productName,
  type,
  typesId,
  quantity,
  status,
  statusesId,
  brandImage,
  brandName,
  price,
  onEdit,
  handleSetProductItem,
}: ProductRowProps) => {
  const [menuPopup, setMenuPopup] = useState<boolean>(false);
  const popup = useRef<HTMLDivElement>(null);
  const iconImage = useRef<HTMLDivElement>(null);

  /**
   * @description function handle show hide popup menu
   *
   * @param {Event} e is event click
   */
  const handleShowHideMenuPopup = useCallback((event: Event) => {
    if (popup.current && !popup.current.contains(event.target as Node)) {
      setMenuPopup(false);
    } else if (iconImage.current && iconImage.current?.contains(event.target as Node)) {
      setMenuPopup((prev) => !prev);
    }
  }, []);

  /**
   * @description function calls the API to get the product's data by id.
   *  And show the data to the form
   */
  const handleModalEdit = useCallback(async () => {
    onEdit({
      id,
      productImage,
      productName,
      type,
      typesId,
      quantity,
      status,
      statusesId,
      brandImage,
      brandName,
      price,
    });
    setMenuPopup(false);
  }, [
    id,
    productImage,
    productName,
    type,
    typesId,
    quantity,
    status,
    statusesId,
    brandImage,
    brandName,
    price,
  ]);

  /**
   * @description function show confirm and set id for confirm popup
   */
  const handleDelete = useCallback(() => {
    handleSetProductItem({
      id,
      productImage,
      productName,
      type,
      typesId,
      quantity,
      status,
      statusesId,
      brandImage,
      brandName,
      price,
    });
    setMenuPopup(false);
  }, [id]);

  useEffect(() => {
    document.addEventListener('click', handleShowHideMenuPopup, true);

    return () => {
      document.removeEventListener('click', handleShowHideMenuPopup, true);
    };
  }, []);

  return (
    <TableRow>
      <TableCell tagName='td'>
        <Identity image={productImage} text={productName} alt={productName} />
      </TableCell>
      <TableCell tagName='td'>
        <Label text={status || ''} variant={`${status === 'Available' ? 'success' : 'warning'}`} />
      </TableCell>
      <TableCell tagName='td'>
        <Typography text={type || ''} weight='regular' />
      </TableCell>
      <TableCell tagName='td'>
        <Label text={String(quantity)} variant='primary' />
      </TableCell>
      <TableCell tagName='td'>
        <Identity image={brandImage} text={brandName} isCircle={true} alt={brandName} />
      </TableCell>
      <TableCell tagName='td'>
        <Typography text={`$${formatPrice(Number(price))}`} weight='regular' />
      </TableCell>
      <TableCell tagName='td'>
        <Image ref={iconImage} image={More} size='sm' alt='icon more' isCursorPointer={true} />
        {menuPopup && <ActionMenu ref={popup} onDelete={handleDelete} onEdit={handleModalEdit} />}
      </TableCell>
    </TableRow>
  );
};

export default memo(ProductRow);
export type { DataProduct, ProductRowProps };
