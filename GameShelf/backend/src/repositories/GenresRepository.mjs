import Genre from "../models/Genre.mjs";
import Game from "../models/Game.mjs";
import IRepository from "./IRepository.mjs";

class genresRepository extends IRepository {

    async obtenerTodos() {

        const genres = await Genre.find();

        const genresWithCount = await Promise.all(
            genres.map(async (genre) => {

                const quantity = await Game.countDocuments({
                    genres: genre._id
                });

                return {
                    ...genre.toObject(),
                    quantity
                };
            })
        );

        return genresWithCount;
    }

    async obtenerPorId(id) {
        return await Genre.findById(id);
    }

    async buscarPorAtributo(atributo, valor) {

        const doc = await Genre.find({ [atributo]: valor });
        return doc;
    }

    async crear(genreData) {
        const nuevoGenero = new Genre(genreData);
        return await nuevoGenero.save();
    }

    async actualizar(id, genreData) {
        return await Genre.findByIdAndUpdate(id, genreData, { returnDocument: 'after' });
    }

    async eliminar(id) {
        return await Genre.findByIdAndDelete(id);
    }

}

export default genresRepository;