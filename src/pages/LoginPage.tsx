import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = () => {
        login();
        navigate('/', { replace: true });
    }

    return (
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Welcome Back
            </h1>
            <div className="space-y-4">
                <button className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium transition-colors cursor-pointer" onClick={handleSignIn}>
                    Sign In
                </button>
                <div className="text-center mt-4">
                    <Link to="/" className="text-gray-400 hover:text-white text-sm">
                        Back to Characters
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;