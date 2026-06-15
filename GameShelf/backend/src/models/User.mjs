import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: Number, default: 2}, // 2 para usuario normal, 1 para admin
    avatar: {type: String},
    bio: {type: String},
    birthDate: {type: Date, required: true},
    isActive: {type: Boolean, required: true}
});

const User = mongoose.model('User', userSchema, 'users');
export default User;