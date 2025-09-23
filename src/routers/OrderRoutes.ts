import { FastifyInstance } from "fastify";
import { ICreateOrder } from "../interfaces/order.interface";
import OrderUseCases from "../usecases/OrderUseCases";

export async function orderRoutes(app: FastifyInstance) {
    app.post<{ Body: ICreateOrder }>('/orders', async (request, reply) => {
        try {
            const order = await OrderUseCases.createOrder(request.body);
            return reply.status(201).send(order);
        } catch (error) {
            console.error("Error creating order:", error);
            return reply.status(400).send({
                success: false,
                error: "Invalid data for order creation."
            });
        }
    });
}