import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{ isAuthenticated: boolean; login: () => void; logout: () => void } | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuth") !== null;
    });

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuth", 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuth");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};