import { IProductsCreate, IReturnProductsCreate } from "./products.interface";


export interface IProductsMethods {
    create(data: IProductsCreate): Promise<IReturnProductsCreate>
    getProducts(): Promise<IReturnProductsCreate>;
}