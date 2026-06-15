import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String},
    slug: {type: String, required: true, unique: true},
    logo: {type: String},
    miniLogo: {type: String, required: true},
    isActive: {type: Boolean, required: true}
});

const Platform = mongoose.model('Platform', platformSchema, 'platforms');
export default Platform;