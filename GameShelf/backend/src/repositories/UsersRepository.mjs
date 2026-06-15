import User from "../models/User.mjs";
import IRepository from "./IRepository.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class usersRepository extends IRepository {

    mapUserResponse(user) {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            bio: user.bio,
            birthDate: user.birthDate,
            avatar: user.avatar
        };
    }

    async obtenerTodos() {
        return await User.find();
    }

    async obtenerPorId(id) {
        return await User.findById(id);
    }

    async buscarPorAtributo(atributo, valor) {

        const doc = await User.find({ [atributo]: valor });
        return doc;
    }

    async crear(userData) {
        const nuevoUsuario = new User(userData);
        return await nuevoUsuario.save();
    }

    async register (userData) {
    
        const existeUsername = await this.buscarPorAtributo('username', userData.username);
        if (existeUsername.length > 0 ) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        const existeEmail = await this.buscarPorAtributo('email', userData.email);
        if (existeEmail.length > 0) {
            throw new Error('El correo electrónico ya está en uso');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        const nuevoUsuario = await this.crear(userData);
        return this.mapUserResponse(nuevoUsuario);
    }

    async login(email, password){
        const usuario = await this.buscarPorAtributo('email', email);

        if (usuario.length === 0) {
            throw new Error('Usuario no encontrado');
        }
        const passwordValida = await bcrypt.compare(password, usuario[0].password);
        
        if (!passwordValida) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: usuario[0]._id, role: usuario[0].role, username: usuario[0].username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        return  {token, usuario: this.mapUserResponse(usuario[0])} ;
    }

    async actualizar(id, userData) {

        const usuario = await User.findById(id);

        if (!usuario){
            throw new Error("Usuario no encontrado");

        }

        const passwordValida = await bcrypt.compare(userData.password, usuario.password);

        if(!passwordValida){
            throw new Error("La contraseña actual no es la correcta");
        }

        const updateData = {
            username: userData.username,
            email: userData.email,
            bio: userData.bio,
            birthDate: userData.birthDate,
            avatar: userData.avatar
        };

        if (userData.newPassword) {
            const mismaPassword = await bcrypt.compare(userData.newPassword, usuario.password);

            if(mismaPassword){
                throw new Error("La nueva contraseña debe ser diferente");
            }

            updateData.password = await bcrypt.hash(userData.newPassword, 10);
        }

        const usuarioActualizado = await User.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
        return this.mapUserResponse(usuarioActualizado);
    }

    async actualizarPorAdmin(id, userData) {

        const usuario = await User.findById(id);

        if (!usuario){
            throw new Error("Usuario no encontrado");

        }

        const updateData = {
            username: userData.username,
            email: userData.email,
            bio: userData.bio,
            birthDate: userData.birthDate,
            avatar: userData.avatar,
            isActive: userData.isActive
        };

        if (userData.newPassword) {
            updateData.password = await bcrypt.hash(userData.newPassword, 10);
        }

        const usuarioActualizado = await User.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });

        return usuarioActualizado;
    }

    async actualizarEstado(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
    }

    async eliminar(id) {
        return await User.findByIdAndDelete(id);
    }

}

export default usersRepository;