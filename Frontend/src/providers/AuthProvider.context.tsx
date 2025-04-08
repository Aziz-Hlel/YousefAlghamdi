import { LoginFormFields } from "@src/component/Login2";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export type IUser = {
    username: string;
    email: string;
    id: string;
    role: string;
}

type IAuthContext = {
    user: IUser | null | undefined;
    login: (data: LoginFormFields) => Promise<AxiosResponse<any, any> | undefined>;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser | null | undefined>(undefined);

    const whoAmI = async () => {
        const response = await Http.get(apiGateway.user.whoAmI);
        response?.status === 200 ? setUser(response.data.result) : setUser(null);
        response?.status !== 200 && setUser(null);
    }

    useEffect(() => {


        whoAmI()
        // console.log("user", user);

    }, []);


    const login = async (data: LoginFormFields): Promise<AxiosResponse<any, any> | undefined> => {
        const response = await Http.post(apiGateway.user.sigIn, data)
        // console.log("response", response?.data.result);
        response?.status === 200 ? setUser(response.data.result) : setUser(null);
        return response
    };

    const logout = () => {
        // console.log("Logged out");
    };

    const contextValue: IAuthContext = {
        user: user,
        login,
        logout,
    };
    // console.log("user", user);

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