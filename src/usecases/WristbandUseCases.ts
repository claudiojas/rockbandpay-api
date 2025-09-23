import { ICreateWristband } from "../interfaces/wristband.interface";
import { z } from "zod";
import WristbandRepositorie from "../repositories/WristbandRepositorie";


const wristbandCreateSchema = z.object({
  code: z.string().min(1, "Code is required"),
  qrCode: z.string().min(1, "QrCode is required"),
});


const codeSchema = z.string().min(1, "Code is required");

class WristbandUseCases {
    async createWristband (data: ICreateWristband) {

        const validatedData = wristbandCreateSchema.parse(data);
        return WristbandRepositorie.createWristband(validatedData)

    }

    async findWristbandByCode(code: string) {
        const validatedCode = codeSchema.parse(code);
        const wristband = await WristbandRepositorie.findWristbandByCode(validatedCode);
        if (!wristband) {
            throw new Error("Wristband not found")
        }
        return wristband;
    }
};


export default new WristbandUseCases;