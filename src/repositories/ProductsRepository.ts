import { PrismaClient } from '@prisma/client';
import { IProductsCreate, IReturnProductsCreate } from '../interfaces/products.interface';
import { IProductsMethods } from '../interfaces/methods.interface';
import { prisma } from '../BD/prisma.config';

class ProductsRepository implements IProductsMethods {
  async createProducts(data: IProductsCreate): Promise<IReturnProductsCreate> {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
      },
    });
    return product;
  }

  async getProducts(): Promise<IReturnProductsCreate[]> {
    const products = await prisma.product.findMany();
    return products;
  }

  async updateProduct(id: string, data: Partial<IProductsCreate>): Promise<IReturnProductsCreate> {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    return product;
  }

  async findProductById(id: string): Promise<IReturnProductsCreate | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  }
}

export default new ProductsRepository();
