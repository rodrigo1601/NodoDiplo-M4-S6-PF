import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    logo: {type: String},
    isActive: {type: Boolean, required: true}
});

const Developer = mongoose.model('Developer', developerSchema, 'developers');
export default Developer;