import { memo, useCallback, useEffect, useRef, useState } from 'react';

// Component
import { TableCell, TableRow, Identity, Image, Label, Typography } from '@components';

// Helpers
import { formatPrice, loaderImage } from '@helpers';

// Components of pages
import { ActionMenu } from '@pages';

// Interfaces
import { DataProduct } from '@interfaces';

interface ProductRowProps extends DataProduct {
  onEdit: (item: DataProduct) => void;
  handleSetProductItem: (item: DataProduct) => void;
}

const ProductRow = ({
  id,
  image,
  name,
  type,
  typesId,
  quantity,
  status,
  statusesId,
  brandImage,
  brand,
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
      image,
      name,
      type,
      typesId,
      quantity,
      status,
      statusesId,
      brandImage,
      brand,
      price,
    });
    setMenuPopup(false);
  }, [id, image, name, type, typesId, quantity, status, statusesId, brandImage, brand, price]);

  /**
   * @description function show confirm and set id for confirm popup
   */
  const handleDelete = useCallback(() => {
    handleSetProductItem({
      id,
      image,
      name,
      type,
      typesId,
      quantity,
      status,
      statusesId,
      brandImage,
      brand,
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

  const TableCellProduct = memo(() => (
    <>
      <TableCell tagName='td'>
        <Identity url={image} text={name} alt={name} />
      </TableCell>
      <TableCell tagName='td'>
        <Label text={status || ''} variant={`${status === 'Available' ? 'success' : 'warning'}`} />
      </TableCell>
      <TableCell tagName='td'>
        <Typography text={type || ''} weight='regular' size='s' />
      </TableCell>
      <TableCell tagName='td'>
        <Label text={String(quantity)} variant='primary' />
      </TableCell>
      <TableCell tagName='td'>
        <Identity url={brandImage} text={brand} isCircle={true} alt={brand} />
      </TableCell>
      <TableCell tagName='td'>
        <Typography text={`$${formatPrice(Number(price))}`} weight='regular' size='s' />
      </TableCell>
    </>
  ));

  return (
    <TableRow>
      <TableCellProduct />
      <TableCell tagName='td'>
        <Image
          ref={iconImage}
          url={loaderImage('/icons/more.svg')}
          size='xs'
          alt='icon more'
          isClickable={true}
        />
        {menuPopup && <ActionMenu ref={popup} onDelete={handleDelete} onEdit={handleModalEdit} />}
      </TableCell>
    </TableRow>
  );
};

export default memo(ProductRow);
export type { ProductRowProps };
