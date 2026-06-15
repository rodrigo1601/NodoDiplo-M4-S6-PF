import { Routes, Route } from "react-router-dom";

import NotFound from "../components/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./ProtectedAdminRoute";
import AuthRoutesBanDuplicate from "./AuthRoutesBanDuplicate";

import Home from "../components/pages/Home";
import Platforms from "../components/pages/Platforms";
import Genres from "../components/pages/Genres";
import Developers from "../components/pages/Developers";
import GameDetail from "../components/pages/GameDetail";
import GamesByType from "../components/pages/GamesByType"
import Login from "../components/pages/Login"
import Register from "../components/pages/Register"
import Perfil from "../components/pages/perfil/Perfil"
import Admin from "../components/pages/admin/Admin";
import DevelopersPage from "../components/pages/admin/developers/DevelopersPage";
import GamesPage from "../components/pages/admin/games/GamesPage";
import GenresPage from "../components/pages/admin/genres/GenresPage";
import PlatformsPage from "../components/pages/admin/platforms/PlatformsPage";
import UsersPage from "../components/pages/admin/users/UsersPage";
import Dashboard from "../components/pages/admin/Dashboard";
import Library from "../components/pages/perfil/library/Library";
import Wishlist from "../components/pages/perfil/wishlist/Wishlist";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthRoutesBanDuplicate><Login/></AuthRoutesBanDuplicate>} />
            <Route path="/register" element={<AuthRoutesBanDuplicate><Register/></AuthRoutesBanDuplicate>} />
            <Route path="/category/platforms" element={<Platforms />} />
            <Route path="/category/genres" element={<Genres />} />
            <Route path="/category/developers" element={<Developers />} />
            <Route path="/category/:type/:slug" element={<GamesByType />} />
            <Route path="/gameDetails/:slug" element={<GameDetail />} />
            <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
            <Route path="/perfil/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/perfil/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>} >
                <Route index element={<Dashboard/>} />
                <Route path="games" element={<GamesPage/>} />
                <Route path="developers" element={<DevelopersPage/>} />
                <Route path="genres" element={<GenresPage/>} />
                <Route path="platforms" element={<PlatformsPage/>} />
                <Route path="users" element={<UsersPage/>} />
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default AppRouter;