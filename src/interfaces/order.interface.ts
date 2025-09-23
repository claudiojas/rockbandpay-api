import { Decimal } from "@prisma/client/runtime/library";
import { OrderStatus } from "@prisma/client";

export interface ICreateOrder {
    wristbandId: string,
    status?: OrderStatus,
    totalAmount?: number
}

export interface IOrder {
    id: string;
    wristbandId: string;
    status: OrderStatus;
    totalAmount: Decimal;
    createdAt: Date;
    updatedAt: Date;
}