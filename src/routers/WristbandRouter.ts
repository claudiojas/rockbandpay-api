import { FastifyInstance } from "fastify";
import { z } from "zod";
import WristbandUseCases from "../usecases/WristbandUseCases";

export async function wristbandRoutes(app: FastifyInstance) {

    app.post('/wristbands', async (request, reply) => {
        const createWristbandSchema = z.object({
            code: z.string(),
            qrCode: z.string(),
        });
        try {
            const { code, qrCode } = createWristbandSchema.parse(request.body);
            const wristband = await WristbandUseCases.createWristband({ code, qrCode });
            return reply.status(201).send(wristband);
        } catch (error) {
            console.error("Error creating wristband:", error);
            return reply.status(400).send({
                success: false,
                error: "Invalid data for wristband creation.",
            });
        }
    });

    app.get('/wristbands/:code', async (request, reply) => {
        const getWristbandSchema = z.object({
            code: z.string()
        })
        const { code } = getWristbandSchema.parse(request.params)
        try {
            const wristband = await WristbandUseCases.findWristbandByCode(code);

            return reply.send(wristband)
        } catch (error: any) {
            if (error.message === "Wristband not found") {
                return reply.status(404).send({
                    success: false,
                    error: error.message
                });
            }
            console.error(`Error fetching wristband ${code}:`, error);
            return reply.status(500).send({
                success: false,
                error: "Unable to search for wristband."
            });
        }
    });

    app.get('/wristbands', async (request, reply) => {
        try {
            const wristbands = await WristbandUseCases.getAllWristbands();
            return reply.send(wristbands);
        } catch (error) {
            console.error("Error fetching all wristbands:", error);
            return reply.status(500).send({
                success: false,
                error: "Unable to fetch all wristbands."
            });
        }
    });
}