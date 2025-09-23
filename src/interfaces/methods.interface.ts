import { ICategory, ICreateCategory } from "./categorie.interface";
import { IProductsCreate, IReturnProductsCreate } from "./products.interface";
import { ICreateWristband, IWristband } from "./wristband.interface";
import { ICreateOrder, IOrder } from "./order.interface";


export interface IProductsMethods {
    createProduct(data: IProductsCreate): Promise<IReturnProductsCreate>
    getProducts(): Promise<IReturnProductsCreate[]>;
    updateProduct(id: string, data: Partial<IProductsCreate>): Promise<IReturnProductsCreate>;
    findProductById(id: string): Promise<IReturnProductsCreate | null>;
    getProductsByCategoryId(id: string): Promise<IReturnProductsCreate[] | null>;
}

export interface ICategoryMethods {
    createCategory(data: ICreateCategory): Promise<ICategory>
}

export interface IWristbandMethods {
    createWristband(data: ICreateWristband): Promise<IWristband>;
    findWristbandByCode(code: string): Promise<IWristband | null>;
}

export interface IOrderMethods {
    createOrder(data: ICreateOrder): Promise<IOrder>;
}