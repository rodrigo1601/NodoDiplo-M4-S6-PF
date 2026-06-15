import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String},
    slug: {type: String, required: true, unique: true},
    logo: {type: String},
    isActive: {type: Boolean, required: true}
});

const Genre = mongoose.model('Genre', genreSchema, 'genres');
export default Genre;