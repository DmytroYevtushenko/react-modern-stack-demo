import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4">
            <Outlet />
        </div>
    );
};

export default AuthLayout;