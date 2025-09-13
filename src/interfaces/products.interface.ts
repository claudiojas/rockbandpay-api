import { Decimal } from "@prisma/client/runtime/library";

export interface IProductsCreate {
    name: string,
    price: number,
    categoryId: string,
    description?: string,
};

export interface IReturnProductsCreate {
  id: string,
  name: string,
  description: string | null,
  price: Decimal,
  categoryId: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}