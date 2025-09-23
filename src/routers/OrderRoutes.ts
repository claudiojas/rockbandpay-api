import { FastifyInstance } from "fastify";
import { ICreateOrder } from "../interfaces/order.interface";
import OrderUseCases from "../usecases/OrderUseCases";
import { ICreateOrderItem } from "../interfaces/order-item.interface";

type OrderItemData = Omit<ICreateOrderItem, 'orderId'>;

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

    app.get<{ Params: { wristbandId: string } }>('/orders/:wristbandId', async (request, reply) => {
        const { wristbandId } = request.params;
        try {
            const orders = await OrderUseCases.findOrdersByWristbandId(wristbandId);
            return reply.status(200).send(orders);
        } catch (error: any) {
            if (error.message === "No orders found for this wristband.") {
                return reply.status(404).send({
                    success: false,
                    error: error.message
                });
            }
            console.error(`Error fetching orders for wristband ${wristbandId}:`, error);
            return reply.status(500).send({
                success: false,
                error: "Unable to search for orders."
            });
        }
    });

    app.post<{ Params: { orderId: string }, Body: OrderItemData }>('/orders/:orderId/items', async (request, reply) => {
        const { orderId } = request.params;
        const itemData = request.body;
        try {
            const orderItem = await OrderUseCases.addOrderItem(orderId, itemData);
            return reply.status(201).send(orderItem);
        } catch (error) {
            console.error(`Error adding item to order ${orderId}:`, error);
            return reply.status(400).send({
                success: false,
                error: "Invalid data for order item."
            });
        }
    });
}