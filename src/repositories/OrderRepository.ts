import { prisma } from "../BD/prisma.config";
import { IOrderMethods } from "../interfaces/methods.interface";
import { ICreateOrder, IOrder } from "../interfaces/order.interface";
import { ICreateOrderItem, IOrderItem } from "../interfaces/order-item.interface";

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

    async findOrdersByWristbandId(wristbandId: string): Promise<IOrder[] | null> {
        const orders = await prisma.order.findMany({
            where: {
                wristbandId,
            },
        });
        return orders;
    }

    async addOrderItem(orderId: string, data: ICreateOrderItem): Promise<IOrderItem> {
        const orderItem = await prisma.orderItem.create({
            data: {
                orderId: orderId,
                productId: data.productId,
                quantity: data.quantity,
                unitPrice: data.unitPrice,
                totalPrice: data.totalPrice,
            }
        });
        return orderItem;
    }
};


export default new OrderRepository;