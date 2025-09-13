import { FastifyInstance } from "fastify";

export async function getOrders (app: FastifyInstance) {
    app.get('/', async (_, reply) => {
        return reply.status(200).send({
            message: 'Orders consumed successfully'
        });
    });
}