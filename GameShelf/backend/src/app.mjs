import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dbConfig.mjs';
import dotenv from "dotenv";
import genresRoutes from './routes/genresRoutes.mjs';
import developersRoutes from './routes/developersRoutes.mjs';
import platformsRoutes from './routes/platformsRoutes.mjs';
import gamesRoutes from './routes/gamesRoutes.mjs';
import usersRoutes from './routes/usersRoutes.mjs';
import userGamesRoutes from './routes/userGamesRoutes.mjs';

const app = express();
const PORT = 3000;

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/genres', genresRoutes);
app.use('/api/developers', developersRoutes);
app.use('/api/platforms', platformsRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/userGames', userGamesRoutes);

connectDB();

app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}/api`);
});