import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, useContext, useEffect, useState } from "react";


type IUser = {
    username: string;
    email: string;
    id: string;
    role: string;
    token: string;
}

type IAuthContext = {
    user: IUser | null | undefined;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser | null | undefined>(undefined);

    const whoAmI = async () => {
        const response = await Http.get(apiGateway.user.whoAmI);
        response?.status === 200 && console.log(response.data);
        response?.status !== 200 && setUser(null);
    }

    useEffect(() => {
        const whoAmI = async () => {
            const response = await Http.get(apiGateway.user.whoAmI);
            response?.status === 200 && console.log(response.data) && setUser(response.data.result);
            response?.status !== 200 && setUser(null);
        }

        whoAmI()
        console.log("user", user);

    }, []);


    const login = async () => {
        await whoAmI()
    };

    const logout = () => {
        console.log("Logged out");
    };

    const contextValue: IAuthContext = {
        user: null,
        login,
        logout,
    };
    console.log("user", user);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}