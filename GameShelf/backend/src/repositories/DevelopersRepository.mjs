import Developer from "../models/Developer.mjs";
import IRepository from "./IRepository.mjs";
import Game from "../models/Game.mjs";

class developersRepository extends IRepository {

    async obtenerTodos() {
        return await Developer.find();
    }
    async obtenerTodos() {
        
                const developers = await Developer.find();
        
                const developersWithCount = await Promise.all(
                    developers.map(async (developer) => {
        
                        const quantity = await Game.countDocuments({
                            developer: developer._id
                        });
        
                        return {
                            ...developer.toObject(),
                            quantity
                        };
                    })
                );
        
                return developersWithCount;
    }

    async obtenerPorId(id) {
        return await Developer.findById(id);
    }

    async buscarPorAtributo(atributo, valor) {

        const doc = await Developer.find({ [atributo]: valor });
        return doc;
    }

    async crear(developerData) {
        const nuevoDeveloper = new Developer(developerData);
        return await nuevoDeveloper.save();
    }

    async actualizar(id, developerData) {
        return await Developer.findByIdAndUpdate(id, developerData, { returnDocument: 'after' });
    }

    async eliminar(id) {
        return await Developer.findByIdAndDelete(id);
    }

}

export default developersRepository;