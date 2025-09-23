import { FastifyInstance } from "fastify";
import { ICreateCategory } from "../interfaces/categorie.interface";
import CategorieUseCases from "../usecases/CategorieUseCases";

export async function categorieRoutes(app: FastifyInstance) {


    app.post<{ Body: ICreateCategory }>('/categorie', async (request, reply) => {

        try {
            const categorie = await CategorieUseCases.createCategorie(request.body)
            return reply.status(201).send(categorie);
        } catch (error: any) {
            if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
                return reply.status(409).send({
                    success: false,
                    error: "A category with this name already exists."
                });
            }
            console.error("Error creating category:", error);
            return reply.status(400).send({ 
                success: false,
                error: "Invalid data for category creation."
            });
        }
    })

};