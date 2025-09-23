import { ICategory, ICreateCategory } from "./categorie.interface";
import { IProductsCreate, IReturnProductsCreate } from "./products.interface";
import { ICreateWristband, IWristband } from "./wristband.interface";


export interface IProductsMethods {
    createProducts(data: IProductsCreate): Promise<IReturnProductsCreate>
    getProducts(): Promise<IReturnProductsCreate[]>;
    updateProduct(id: string, data: Partial<IProductsCreate>): Promise<IReturnProductsCreate>;
    findProductById(id: string): Promise<IReturnProductsCreate | null>;
}

export interface ICategoryMethods {
    creteCategory(data: ICreateCategory): Promise<ICategory>
}

export interface IWristbandMethods {
    creteCategory(data: ICreateWristband): Promise<IWristband>
}