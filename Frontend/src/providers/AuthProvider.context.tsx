import { LoginFormFields } from "@src/component/Login2";
import { SignUpSchemaType } from "@src/component/SignUp2";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export type IUser = {

    _id: string;

    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;

    clientInfo?: {
        agentId?: string,
    };

    agentInfo?: {

        imageGallery: {
            folderId: string,
            mainImage: {
                key: string,
                url?: string,
            },
            miniImage: {
                key: string,
                url?: string,
            }
        },

        clientsId: string[],

    };

    adminInfo?: {



        imageGallery: {
            folderId: string,
            mainImage: {
                key: string,
                url?: string,
            },
            miniImage: {
                key: string,
                url?: string,
            }
        },

    };


}

type IAuthContext = {
    user: IUser | null | undefined;
    signup: (data: SignUpSchemaType) => Promise<AxiosResponse<any, any> | undefined>;
    login: (data: LoginFormFields) => Promise<AxiosResponse<any, any> | undefined>;
    logout: () => void;
    refreshUser: () => void;
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

    const signup = async (data: SignUpSchemaType): Promise<AxiosResponse<any, any> | undefined> => {
        const response = await Http.post(apiGateway.user.signUp, data);

        response?.status === 200 ? setUser(response.data.result) : setUser(null);
        return response

    }

    const login = async (data: LoginFormFields): Promise<AxiosResponse<any, any> | undefined> => {
        const response = await Http.post(apiGateway.user.sigIn, data)
        // console.log("response", response?.data.result);
        response?.status === 200 ? setUser(response.data.result) : setUser(null);
        return response
    };

    const logout = async () => {
        console.log("🔥💀🚀🛸🔥💀🚀🛸 logoutaaaaaaaaaaaaaa!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        await Http.post(apiGateway.user.logOut, {})
        setUser(null);
    };

    const contextValue: IAuthContext = {
        user,
        signup,
        login,
        logout,
        refreshUser: whoAmI,
    };
    // console.log("user", user);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}