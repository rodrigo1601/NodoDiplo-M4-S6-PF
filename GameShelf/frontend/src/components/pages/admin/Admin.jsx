import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Admin = () => (
    <div className="min-h-screen bg-[#0a0c10] flex text-white font-sans">
        <Sidebar />
        <main className="flex-1 overflow-auto">
            <Outlet />
        </main>
    </div>
);

export default Admin;