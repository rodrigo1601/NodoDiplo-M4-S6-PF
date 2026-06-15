import Platform from "../models/Platform.mjs";
import IRepository from "./IRepository.mjs";
import Game from "../models/Game.mjs";

class platformsRepository extends IRepository {

    async obtenerTodos() {
    
            const platforms = await Platform.find();
    
            const platformsWithCount = await Promise.all(
                platforms.map(async (platform) => {
    
                    const quantity = await Game.countDocuments({
                        platforms: platform._id
                    });
    
                    return {
                        ...platform.toObject(),
                        quantity
                    };
                })
            );
    
            return platformsWithCount;
    }

    async obtenerPorId(id) {
        return await Platform.findById(id);
    }

    async buscarPorAtributo(atributo, valor) {

        const doc = await Platform.find({ [atributo]: valor });
        return doc;
    }

    async crear(platformData) {
        const nuevaPlataforma = new Platform(platformData);
        return await nuevaPlataforma.save();
    }

    async actualizar(id, platformData) {
        return await Platform.findByIdAndUpdate(id, platformData, { returnDocument: 'after' });
    }

    async eliminar(id) {
        return await Platform.findByIdAndDelete(id);
    }

}

export default platformsRepository;