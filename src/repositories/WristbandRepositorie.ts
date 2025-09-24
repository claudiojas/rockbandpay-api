import { prisma } from "../BD/prisma.config";
import { IWristbandMethods } from "../interfaces/methods.interface";
import { ICreateWristband, IWristband } from "../interfaces/wristband.interface";

class WristbandRepositorie implements IWristbandMethods {
    async createWristband(data: ICreateWristband): Promise<IWristband> {
        const wristband = await prisma.wristband.create({
            data: {
                code: data.code,
                qrCode: data.qrCode
            }
        })
        return wristband
    }

    async findWristbandByCode(code: string): Promise<IWristband | null> {
        const wristband = await prisma.wristband.findUnique({
            where: {
                code,
            }
        });
        return wristband;
    }

    async getAllWristbands(): Promise<IWristband[]> {
        const wristbands = await prisma.wristband.findMany();
        return wristbands;
    }
};


export default new WristbandRepositorie;