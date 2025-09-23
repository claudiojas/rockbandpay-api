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
    })
}