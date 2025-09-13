import ProductsRepository from "../repositories/ProductsRepository";
import { IProductsCreate } from "../interfaces/products.interface";
import { z } from "zod";

const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  categoryId: z.string().min(1, "Category ID is required"),
  description: z.string().optional(),
});

const productUpdateSchema = productCreateSchema.partial();

class ProductUseCases {
  async createProduct(data: IProductsCreate) {
    const validatedData = productCreateSchema.parse(data);
    return ProductsRepository.createProducts(validatedData);
  }

  async getProducts() {
    return ProductsRepository.getProducts();
  }

  async updateProduct(id: string, data: Partial<IProductsCreate>) {
    const productExists = await ProductsRepository.findProductById(id);
    if (!productExists) {
      throw new Error("Product not found");
    }

    const validatedData = productUpdateSchema.parse(data);
    return ProductsRepository.updateProduct(id, validatedData);
  }
}

export default new ProductUseCases();
