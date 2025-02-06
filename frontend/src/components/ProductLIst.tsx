import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/schema/product";
import { moneyHelper } from "@/utils";
import { ReactNode } from "react";

interface ProductListProps {
  products: IProduct[];
  actions?: (pr: IProduct) => ReactNode;
}

export default function ProductList({ products, actions }: ProductListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            {actions && <TableHead>*</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>S/.{moneyHelper.fromCents(product.price)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              {actions && <TableCell>{actions(product)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
