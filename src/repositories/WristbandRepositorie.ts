import { prisma } from "../BD/prisma.config";
import { IWristbandMethods } from "../interfaces/methods.interface";
import { ICreateWristband, IWristband } from "../interfaces/wristband.interface";

class WristbandRepositorie implements IWristbandMethods {
    async creteCategory(data: ICreateWristband): Promise<IWristband> {
        const wristband = await prisma.wristband.create({
            data: {
                code: data.code,
                qrCode: data.qrCode
            }
        })
        return wristband
    }
};


export default new WristbandRepositorie;