import { Table, TableBody, TableCell, TableHeader, TableRow } from '@components';

export const App = () => (
  <main className='container'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell tagName='th'>Ernst Handel</TableCell>
          <TableCell tagName='th'>Roland Mendel</TableCell>
          <TableCell tagName='th'>Austria</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ernst Handel</TableCell>
          <TableCell>Roland Mendel</TableCell>
          <TableCell>Austria</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ernst Handel</TableCell>
          <TableCell>Roland Mendel</TableCell>
          <TableCell>Austria</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ernst Handel</TableCell>
          <TableCell>Roland Mendel</TableCell>
          <TableCell>Austria</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </main>
);
