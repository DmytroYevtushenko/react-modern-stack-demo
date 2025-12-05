import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const MainLayout = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <nav className="p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    Rick & Morty App
                </div>
                <div className="flex gap-4">
                    <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                        Characters
                    </Link>
                    <button onClick={handleLogout} className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                        Logout
                    </button>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;