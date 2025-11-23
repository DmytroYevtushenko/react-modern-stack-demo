import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
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
                    <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition-colors">
                        Login
                    </Link>
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;