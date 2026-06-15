import Game from "../models/Game.mjs";
import IRepository from "./IRepository.mjs";
import Genre from "../models/Genre.mjs";
import Platform from "../models/Platform.mjs";
import Developer from "../models/Developer.mjs";
import UserGame from "../models/userGame.mjs";

class gamesRepository extends IRepository {

   /* async obtenerTodos() {
        return await Game.find()
        .populate('genres', 'nombre slug')
        .populate('platforms', 'nombre slug')
        .populate('developer', 'nombre slug');
    } */

    async obtenerTodos() {
        const juegos = await Game.find()
            .populate('genres', 'nombre slug logo isActive')
            .populate('platforms', 'nombre slug logo miniLogo isActive')
            .populate('developer', 'nombre slug logo isActive');

        const ratings = await UserGame.aggregate([
            {
                $match: {
                    rating: { $nin: ["N/A", null] }
                }
            },
            {
                $group: {
                    _id: {
                        gameId: "$gameId",
                        rating: "$rating"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const ratingsMap = {};

        ratings.forEach(r => {
            const gameId = r._id.gameId.toString();

            if (!ratingsMap[gameId]) {
                ratingsMap[gameId] = {
                    excepcional: 0,
                    recomendado: 0,
                    meh: 0,
                    skip: 0
                };
            }

            ratingsMap[gameId][r._id.rating.toLowerCase()] = r.count;
        });

        return juegos.map(juego => ({
            ...juego.toObject(),
            ratingStats: ratingsMap[juego._id.toString()] || {
                excepcional: 0,
                recomendado: 0,
                meh: 0,
                skip: 0
            }
        }));
    }

    async obtenerPorId(id) {
        return await Game.findById(id)
        .populate('genres', 'nombre slug logo isActive')
        .populate('platforms', 'nombre slug logo miniLogo isActive')
        .populate('developer', 'nombre slug logo isActive');
    }

    async obtenerPorSlug(slug) {
        const juego = await Game.findOne({ slug })
        .populate('genres', 'nombre slug logo isActive')
        .populate('platforms', 'nombre slug logo miniLogo isActive')
        .populate('developer', 'nombre slug logo isActive');

        const ratings = await UserGame.aggregate([
            {
                $match: {
                    rating: { $nin: ["N/A", null] }
                }
            },
            {
                $group: {
                    _id: {
                        gameId: "$gameId",
                        rating: "$rating"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const ratingsMap = {};

        ratings.forEach(r => {
            const gameId = r._id.gameId.toString();

            if (!ratingsMap[gameId]) {
                ratingsMap[gameId] = {
                    excepcional: 0,
                    recomendado: 0,
                    meh: 0,
                    skip: 0
                };
            }

            ratingsMap[gameId][r._id.rating.toLowerCase()] = r.count;
        });

        return {
            ...juego.toObject(),
            ratingStats: ratingsMap[juego._id.toString()] || {
                excepcional: 0,
                recomendado: 0,
                meh: 0,
                skip: 0
            }
        };
    }
    
    async obtenerVariosPorTypeYSlug(slug, type) {
        let doc;
        switch (type) {
            case 'genres':
                doc = await Genre.findOne({ slug });
                return await Game.find({ genres: doc._id })
                .populate('genres', 'nombre slug logo isActive')
                .populate('platforms', 'nombre slug logo miniLogo isActive')
                .populate('developer', 'nombre slug logo isActive');
            case 'platforms':
                doc = await Platform.findOne({ slug });
                return await Game.find({ platforms: doc._id })
                .populate('genres', 'nombre slug logo isActive')
                .populate('platforms', 'nombre slug logo miniLogo isActive')
                .populate('developer', 'nombre slug logo isActive');
            case 'developers':
                doc = await Developer.findOne({ slug });
                return await Game.find({ developer: doc._id })
                .populate('genres', 'nombre slug logo isActive')
                .populate('platforms', 'nombre slug logo miniLogo isActive')
                .populate('developer', 'nombre slug logo isActive');
            default:
                throw new Error('Tipo no válido');
        }
    }

    async buscarPorAtributo(atributo, valor) {

        const doc = await Game.find({ [atributo]: valor });
        return doc;
    }

    async crear(gameData) {
        const nuevoJuego = new Game(gameData);
        return await nuevoJuego.save();
    }

    async actualizar(id, gameData) {
        return await Game.findByIdAndUpdate(id, gameData, { returnDocument: 'after' })
                        .populate('genres', 'nombre slug logo isActive')
                        .populate('platforms', 'nombre slug logo miniLogo isActive')
                        .populate('developer', 'nombre slug logo isActive');;
    }

    async eliminar(id) {
        return await Game.findByIdAndDelete(id);
    }

}

export default gamesRepository;