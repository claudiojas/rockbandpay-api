import { ICreateOrder, IOrder } from "../interfaces/order.interface";
import { z } from "zod";
import OrderRepository from "../repositories/OrderRepository";

const orderCreateSchema = z.object({
    wristbandId: z.string().min(1, "Wristband ID is required"),
    status: z.enum(["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED", "CANCELLED"]).optional(),
    totalAmount: z.number().optional().default(0)
});

class OrderUseCases {
    async createOrder(data: ICreateOrder): Promise<IOrder> {
        const validatedData = orderCreateSchema.parse(data);
        return OrderRepository.createOrder(validatedData);
    }
}

export default new OrderUseCases();