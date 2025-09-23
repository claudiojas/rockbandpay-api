import { describe, it, expect, beforeEach, afterAll, beforeAll } from 'vitest';
import supertest from 'supertest';
import { App } from '../../app';
import { PrismaClient } from '@prisma/client';

// Single app instance for all tests
const appInstance = new App();
appInstance.register();
const server = appInstance.getServer();
const prisma = new PrismaClient();

describe('API Routes', () => {

  beforeAll(async () => {
    await server.ready();
  });

  // Runs before EACH test, ensuring a clean slate
  beforeEach(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.wristband.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await server.close();
  });

  // --- Category Tests ---

  it('should be able to create a new category', async () => {
    const categoryData = { name: 'Petiscos', isActive: true };
    const response = await supertest(server.server).post('/categorie').send(categoryData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to list products by category', async () => {
    const category = await prisma.category.create({ data: { name: 'Vinhos', isActive: true } });
    const product = await prisma.product.create({
      data: { name: 'Vinho Tinto Seco', price: 75.00, categoryId: category.id }
    });
    const response = await supertest(server.server).get(`/categories/${category.id}/products`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id', product.id);
  });

  // --- Product Tests ---

  it('should be able to create a new product', async () => {
    const category = await prisma.category.create({ data: { name: 'Bebidas', isActive: true } });
    const productData = { name: 'Cerveja IPA', price: 15.50, categoryId: category.id };
    const response = await supertest(server.server).post('/products').send(productData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to list all products', async () => {
    const category = await prisma.category.create({ data: { name: 'Lanches', isActive: true } });
    await prisma.product.createMany({
      data: [
        { name: 'Hambúrguer', price: 25.00, categoryId: category.id },
        { name: 'Batata Frita', price: 12.00, categoryId: category.id },
      ]
    });
    const response = await supertest(server.server).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2); // This should work now
  });

  it('should be able to update a product', async () => {
    const category = await prisma.category.create({ data: { name: 'Sobremesas', isActive: true } });
    const product = await prisma.product.create({
      data: { name: 'Pudim', price: 10.00, categoryId: category.id }
    });
    const updatedData = { name: 'Pudim de Leite', price: 11.50 };
    const response = await supertest(server.server).put(`/products/${product.id}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });
});