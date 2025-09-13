import { FastifyInstance } from 'fastify';
import ProductUseCases from '../usecases/ProductUseCases';
import { IProductsCreate } from '../interfaces/products.interface';

export async function productRoutes(app: FastifyInstance) {
  app.post<{ Body: IProductsCreate }>('/products', async (request, reply) => {
    try {
      const product = await ProductUseCases.createProduct(request.body);
      return reply.status(201).send(product);
    } catch (error) {
      console.error("Error creating product:", error);
      return reply.status(400).send({ 
        success: false,
        error: "Invalid data for product creation."
      });
    }
  });

  app.get('/products', async (request, reply) => {
    try {
      const products = await ProductUseCases.getProducts();
      return reply.status(200).send(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return reply.status(500).send({ 
        success: false,
        error: "Unable to search for products."
      });
    }
  });

  app.put<{ Body: Partial<IProductsCreate>; Params: { id: string } }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const product = await ProductUseCases.updateProduct(id, request.body);
      return reply.status(200).send(product);
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      return reply.status(400).send({ 
        success: false,
        error: "Invalid data for product update."
      });
    }
  });
}
