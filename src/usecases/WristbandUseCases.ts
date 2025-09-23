import { ICreateWristband } from "../interfaces/wristband.interface";
import { z } from "zod";
import WristbandRepositorie from "../repositories/WristbandRepositorie";


const wristbandCreateSchema = z.object({
  code: z.string().min(1, "Code is required"),
  qrCode: z.string().min(1, "QrCode is required"),
});


class WristbandUseCases {
    async createWristband (data: ICreateWristband) {

        const validatedData = wristbandCreateSchema.parse(data);
        return WristbandRepositorie.creteCategory(validatedData)

    }
};


export default new WristbandUseCases;