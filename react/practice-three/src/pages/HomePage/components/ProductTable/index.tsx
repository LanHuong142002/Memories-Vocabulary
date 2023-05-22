import { ChangeEvent, memo } from 'react';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Input,
  Select,
  SelectItemProps,
  Typography,
} from '@components';

// Components of pages
import { ProductRow, ProductRowProps } from '@pages';

// Interfaces
import { Product } from '@interfaces';

interface Filters {
  name: string;
  statusesId: string;
  typesId: string;
  quantity: string;
  brand: string;
  price: string;
}

interface ProductTableProps
  extends Pick<ProductRowProps, 'onEdit' | 'onSetProductItem' | 'onHandleNotification'> {
  filters: Filters;
  status: SelectItemProps[];
  types: SelectItemProps[];
  products: Product[];
  onSearch: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProductTable = ({
  filters,
  status,
  types,
  products,
  onSearch,
  onEdit,
  onSetProductItem,
  onHandleNotification,
}: ProductTableProps): React.ReactElement => (
  <Table>
    <TableHeader>
      <TableRow classTableRow='header'>
        <TableCell title='Product' tagName='th'>
          <Input name='name' value={filters.name} placeholder='Search' onChange={onSearch} />
        </TableCell>
        <TableCell title='Status' tagName='th'>
          <Select
            name='statusesId'
            options={status}
            optionAll={true}
            valueSelected={filters.statusesId}
            onChange={onSearch}
          />
        </TableCell>
        <TableCell title='Type' tagName='th'>
          <Select
            name='typesId'
            options={types}
            optionAll={true}
            valueSelected={filters.typesId}
            onChange={onSearch}
          />
        </TableCell>
        <TableCell title='Quantity' tagName='th'>
          <Input
            name='quantity'
            type='number'
            value={filters.quantity}
            placeholder='Search'
            onChange={onSearch}
          />
        </TableCell>
        <TableCell title='Brand' tagName='th'>
          <Input name='brand' value={filters.brand} placeholder='Search' onChange={onSearch} />
        </TableCell>
        <TableCell title='Price' tagName='th'>
          <Input
            name='price'
            type='number'
            value={filters.price}
            placeholder='Search'
            onChange={onSearch}
          />
        </TableCell>
        <TableCell title='Action' tagName='th' />
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.length > 0 ? (
        products.map((item) => (
          <ProductRow
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            status={item.statuses ? item.statuses.name : ''}
            type={item.types ? item.types.name : ''}
            statusesId={item.statuses ? item.statuses.id : ''}
            typesId={item.types ? item.types.id : ''}
            quantity={item.quantity}
            brandImage={item.brandImage}
            brand={item.brand}
            price={item.price}
            onEdit={onEdit}
            onSetProductItem={onSetProductItem}
            onHandleNotification={onHandleNotification}
          />
        ))
      ) : (
        <TableRow classTableRow='message'>
          <TableCell tagName='td'>
            <Typography text='No products to display' weight='semiBold' />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default memo(ProductTable);
export type { Filters };
