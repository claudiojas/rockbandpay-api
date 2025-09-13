import { FastifyInstance } from "fastify";
import { ICreateCategory } from "../interfaces/categorie.interface";
import CategorieUseCases from "../usecases/CategorieUseCases";

export async function categorieRoutes(app: FastifyInstance) {


    app.post<{ Body: ICreateCategory }>('/categorie', async (request, reply) => {

        try {
            const categorie = await CategorieUseCases.createCategorie(request.body)
            return reply.status(201).send(categorie);
        } catch (error) {
            console.error("Error creating product:", error);
            return reply.status(400).send({ 
            success: false,
            error: "Invalid data for product creation."
            });
        }

    })

};