import { prisma } from "../BD/prisma.config";
import { IOrderMethods } from "../interfaces/methods.interface";
import { ICreateOrder, IOrder } from "../interfaces/order.interface";

class OrderRepository implements IOrderMethods {
    async createOrder(data: ICreateOrder): Promise<IOrder> {
        const order = await prisma.order.create({
            data: {
                wristbandId: data.wristbandId,
                status: data.status,
                totalAmount: data.totalAmount
            }
        });
        return order;
    }
}

export default new OrderRepository();