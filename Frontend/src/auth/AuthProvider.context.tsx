import { createContext } from "react";


type IUser = {
    username: string;
    email: string;
    id: string;
    role: string;
    token: string;
}

type IAuthContext = {
    user: IUser | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const login = () => {
        console.log("Logged in");
    };

    const logout = () => {
        console.log("Logged out");
    };

    const contextValue: IAuthContext = {
        user: null,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}