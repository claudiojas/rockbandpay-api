import { FastifyInstance } from "fastify";
import { ICreateWristband } from "../interfaces/wristband.interface";
import WristbandUseCases from "../usecases/WristbandUseCases";

export async function  wristbandRoutes (app: FastifyInstance) {
    app.post<{ Body: ICreateWristband }>('/wristband', async (request, reply) => {
        try {
            const wristband = await WristbandUseCases.createWristband(request.body)
            return reply.status(201).send(wristband);
            
        } catch (error) {
            console.error("Error creating wristband:", error);
            return reply.status(400).send({ 
                success: false,
                error: "Invalid data for wristband creation."
            });
        }
    });

    app.get<{ Params: { code: string } }>('/wristbands/:code', async (request, reply) => {
        const { code } = request.params;
        try {
            const wristband = await WristbandUseCases.findWristbandByCode(code);
            return reply.status(200).send(wristband);
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
}