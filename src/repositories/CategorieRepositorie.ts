import { prisma } from "../BD/prisma.config";
import { ICreateCategory, ICategory } from "../interfaces/categorie.interface";
import { ICategoryMethods } from "../interfaces/methods.interface";

class CategorieRepositorie implements ICategoryMethods {
    async creteCategory(data: ICreateCategory): Promise<ICategory> {
        const categorie = await prisma.category.create({
            data: {
                name: data.name,
                isActive: data.isActive
            }
        });

        return categorie;
    }
};


export default new CategorieRepositorie