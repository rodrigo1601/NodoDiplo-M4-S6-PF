import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    portada: {type: String, required: true},
    description: {type: String},
    releaseDate: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now},
    images: [{type: String}],
    genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
    platforms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Platform'}],
    developer: {type: mongoose.Schema.Types.ObjectId, ref: 'Developer'},
    requirements: {
        os: {type: String},
        cpu: {type: String},
        gpu: {type: String},
        ram: {type: String},
        storage: {type: String}
    },
    ageRating: {type: Number, required: true},
    isActive: {type: Boolean, required: true}
});

const Game = mongoose.model('Game', gameSchema, 'games');
export default Game;