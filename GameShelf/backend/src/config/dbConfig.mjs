import dotenv from "dotenv";

dotenv.config();

import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect('mongodb+srv://ribanez_db_user:7pXBQ32VsWaYFaFo@cluster-dev.zngzdwt.mongodb.net/GameShelf');
        console.log('Conectado a MongoDB');
    }catch(error){
        console.error('error de conexión:', error);
        process.exit(1); // Salir del proceso con un código de error
    }
}

