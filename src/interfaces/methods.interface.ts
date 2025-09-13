import { IProductsCreate, IReturnProductsCreate } from "./products.interface";


export interface IProductsMethods {
    createProducts(data: IProductsCreate): Promise<IReturnProductsCreate>
    getProducts(): Promise<IReturnProductsCreate[]>;
    updateProduct(id: string, data: Partial<IProductsCreate>): Promise<IReturnProductsCreate>;
    findProductById(id: string): Promise<IReturnProductsCreate | null>;
}