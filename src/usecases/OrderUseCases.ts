import { ICreateOrder, IOrder } from "../interfaces/order.interface";
import { z } from "zod";
import OrderRepository from "../repositories/OrderRepository";
import { ICreateOrderItem, IOrderItem } from "../interfaces/order-item.interface";

const orderCreateSchema = z.object({
    wristbandId: z.string().min(1, "Wristband ID is required"),
    status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED", "CANCELLED"]).optional(),
    totalAmount: z.number().optional().default(0)
});

const orderItemDataSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    unitPrice: z.number().positive("Unit price must be a positive number"),
    totalPrice: z.number().positive("Total price must be a positive number"),
});

const wristbandIdSchema = z.string().min(1, "Wristband ID is required");
const orderIdSchema = z.string().min(1, "Order ID is required");

type OrderItemData = Omit<ICreateOrderItem, 'orderId'>;

class OrderUseCases {
    async createOrder(data: ICreateOrder): Promise<IOrder> {
        const validatedData = orderCreateSchema.parse(data);
        return OrderRepository.createOrder(validatedData);
    }

    async findOrdersByWristbandId(wristbandId: string): Promise<IOrder[] | null> {
        const validatedWristbandId = wristbandIdSchema.parse(wristbandId);
        const orders = await OrderRepository.findOrdersByWristbandId(validatedWristbandId);
        if (!orders || orders.length === 0) {
            throw new Error("No orders found for this wristband.");
        }
        return orders;
    }

    async addOrderItem(orderId: string, itemData: OrderItemData): Promise<IOrderItem> {
        const validatedOrderId = orderIdSchema.parse(orderId);
        const validatedItemData = orderItemDataSchema.parse(itemData);

        const fullOrderItem: ICreateOrderItem = {
            orderId: validatedOrderId,
            ...validatedItemData
        };

        return OrderRepository.addOrderItem(validatedOrderId, fullOrderItem);
    }
}

export default new OrderUseCases();