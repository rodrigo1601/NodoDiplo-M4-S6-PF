import mongoose from "mongoose";

const userGame = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    status: {type: String, required: true},
    rating: {type: String, required: true},
    inLibrary: {type: Boolean, required: true},
    inWishlist: {type: Boolean, required: true}
});

const Game = mongoose.model('UserGame', userGame, 'userGames');
export default Game;