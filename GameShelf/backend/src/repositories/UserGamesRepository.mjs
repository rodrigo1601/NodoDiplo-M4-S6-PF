import UserGame from "../models/userGame.mjs";
import IRepository from "./IRepository.mjs";

class userGamesRepository extends IRepository {

    async obtenerTodos() {
        return await UserGame.find()
        .populate('userId', 'username email')
        .populate({
            path: 'gameId',
            populate: [
                {
                    path: 'genres',
                    select: 'nombre isActive'
                },
                {
                    path: 'platforms',
                    select: 'nombre isActive'
                },
                {
                    path: 'developer',
                    select: 'nombre isActive'
                }
            ]
        })
    }

    async obtenerPorId(id) {
        return await UserGame.findById(id)
        .populate('userId', 'username email')
        .populate({
            path: 'gameId',
            populate: [
                {
                    path: 'genres',
                    select: 'nombre isActive'
                },
                {
                    path: 'platforms',
                    select: 'nombre isActive'
                },
                {
                    path: 'developer',
                    select: 'nombre isActive'
                }
            ]
        });
    }

    async buscarPorUsuario(userId) {
        return await UserGame.find({ userId })
        .populate('userId', 'username email')
        .populate({
            path: 'gameId',
            populate: [
                {
                    path: 'genres',
                    select: 'nombre isActive'
                },
                {
                    path: 'platforms',
                    select: 'nombre isActive'
                },
                {
                    path: 'developer',
                    select: 'nombre isActive'
                }
            ]
        });
    }

    async buscarPorAtributo(atributo, valor) {

        const doc = await UserGame.find({ [atributo]: valor });
        return doc;
    }

    async buscarPorUsuarioYJuego(userId, gameId) {
        return await UserGame.findOne({userId, gameId});
    }

    async crear(userGameData) {
        const nuevoGameUsuario = new UserGame(userGameData);

        const saved = await nuevoGameUsuario.save();

        return await UserGame.findById(saved._id)
        .populate('userId', 'username email')
        .populate({
            path: 'gameId',
            populate: [
                {
                    path: 'genres',
                    select: 'nombre isActive'
                },
                {
                    path: 'platforms',
                    select: 'nombre isActive'
                },
                {
                    path: 'developer',
                    select: 'nombre isActive'
                }
            ]
        });
    }

    async actualizar(id, userGameData) {
        return await UserGame.findByIdAndUpdate(id, userGameData, { returnDocument: 'after' })
        .populate('userId', 'username email')
        .populate({
            path: 'gameId',
            populate: [
                {
                    path: 'genres',
                    select: 'nombre isActive'
                },
                {
                    path: 'platforms',
                    select: 'nombre isActive'
                },
                {
                    path: 'developer',
                    select: 'nombre isActive'
                }
            ]
        });
    }

    async eliminar(id) {
        return await UserGame.findByIdAndDelete(id);
    }

}

export default userGamesRepository;