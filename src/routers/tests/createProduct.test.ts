import { describe, it, expect, beforeEach, afterAll, beforeAll } from 'vitest';
import supertest from 'supertest';
import { App } from '../../app';
import { PrismaClient } from '@prisma/client';

// Cria uma instância do nosso app e do Prisma Client
const appInstance = new App();
appInstance.register(); // Registra todas as rotas da aplicação
const server = appInstance.getServer(); // Pega a instância do Fastify

const prisma = new PrismaClient();

describe('POST /products - Product Creation Route', () => {

  beforeAll(async () => {
    await server.ready();
  });

  beforeEach(async () => {
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  });

  afterAll(async () => {
    // Desconecta do banco de dados e fecha o servidor DEPOIS de todos os testes
    await prisma.$disconnect();
    await server.close();
  });

  it('should be able to create a new product', async () => {
    // --- 1. Preparação (Setup) ---
    // Para criar um produto, primeiro precisamos de uma categoria no banco
    const category = await prisma.category.create({
      data: {
        name: 'Bebidas',
      },
    });

    const productData = {
      name: 'Cerveja IPA',
      price: 15.50,
      categoryId: category.id,
      description: 'Uma cerveja amarga e lupulada.',
    };

    // --- 2. Ação (Act) ---
    // Usamos o supertest para fazer uma requisição POST para a nossa API
    const response = await supertest(server.server)
      .post('/products')
      .send(productData);

    // --- 3. Verificação (Assert) ---
    // Verificamos se a resposta da API é a que esperamos
    expect(response.status).toBe(201); // Espera um status HTTP 201 (Created)
    expect(response.body).toHaveProperty('id'); // Espera que o produto retornado tenha um ID
    expect(response.body.name).toBe(productData.name); // Espera que o nome seja o mesmo que enviamos

    // Verificação Bônus: confirma se o produto foi realmente salvo no banco de dados
    const productInDb = await prisma.product.findUnique({
      where: { id: response.body.id },
    });
    expect(productInDb).not.toBeNull(); // Espera que não seja nulo
    expect(productInDb?.name).toBe(productData.name);
  });
});