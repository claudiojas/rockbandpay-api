export interface IProductsCreate {
    name: string,
    price: number,
    categoryId: string,
    description?: string,
};

export interface IReturnProductsCreate {
  id: string,
  name: string,
  description: string,
  price: number,
  categoryId: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}