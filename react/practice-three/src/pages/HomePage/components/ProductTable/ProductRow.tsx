import { Link } from 'react-router-dom';
import { ReactElement, memo, useCallback, useEffect, useRef, useState } from 'react';

// Helpers
import { formatPrice, loadImage } from '@helpers';

// Interfaces
import { Product } from '@interfaces';

// Components
import { TableCell, TableRow, Identity, Image, Label, Typography } from '@components';
import { ActionMenu } from '@pages';

export interface ProductRowProps extends Omit<Product, 'statuses' | 'types'> {
  status: string;
  type: string;
  onEdit: (item: Product) => void;
  onSetProductItem: (item: Product) => void;
  onToggleNotification: () => void;
}

export const ProductRow = memo(
  ({
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
    onSetProductItem,
    onToggleNotification,
  }: ProductRowProps): ReactElement => {
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
        quantity,
        brand,
        brandImage,
        price,
        typesId,
        statusesId,
      });
      setMenuPopup(false);
    }, [id, image, name, quantity, brand, brandImage, price, typesId, statusesId, onEdit]);

    /**
     * @description function show confirm and set id for confirm popup
     */
    const handleDelete = useCallback(() => {
      onToggleNotification();
      onSetProductItem({
        id,
        image,
        name,
        typesId,
        quantity,
        statusesId,
        brandImage,
        brand,
        price,
      });
      setMenuPopup(false);
    }, [
      brand,
      brandImage,
      id,
      image,
      name,
      price,
      quantity,
      statusesId,
      typesId,
      onSetProductItem,
      onToggleNotification,
    ]);

    useEffect(() => {
      document.addEventListener('click', handleShowHideMenuPopup, true);

      return () => {
        document.removeEventListener('click', handleShowHideMenuPopup, true);
      };
    }, [handleShowHideMenuPopup]);

    const TableCellProduct = memo(() => (
      <>
        <TableCell tagName='td'>
          <Link to={`/details/${id}`}>
            <Identity url={image} text={name} alt={name} />
          </Link>
        </TableCell>
        <TableCell tagName='td'>
          <Label
            text={status || ''}
            variant={`${status === 'Available' ? 'success' : 'warning'}`}
          />
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
            url={loadImage('/icons/more-icon.svg')}
            size='xs'
            alt='icon more'
            isClickable
          />
          {menuPopup && <ActionMenu ref={popup} onDelete={handleDelete} onEdit={handleModalEdit} />}
        </TableCell>
      </TableRow>
    );
  },
);
