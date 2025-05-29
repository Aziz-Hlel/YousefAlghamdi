import { LoginFormFields } from "@src/component/Login2";
import { SignUpSchemaType } from "@src/component/SignUp2";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { apiService } from "@src/utils/apiService";
import { tokenManager } from "@src/utils/TokenManager";
import { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export type IUser = {

    id: string;

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


    const getCurrentUser = async () => {
        return await Http.get<{ result: IUser }>(apiGateway.user.me);
    }


    const whoAmI = async () => {


        // tokenManager.setupInterceptors();    // set up axios interceptors
        const response = await getCurrentUser();
        response?.status === 200 ? setUser(response.data.result) : setUser(null);
        response?.status !== 200 && setUser(null);
    }


    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Load tokens from localStorage
                tokenManager.loadTokensFromStorage();

                if (!tokenManager.refreshTokenExist()) setUser(null)
                else {
                    // Try to get user profile to verify token is still valid
                    const refreshToken = tokenManager.getRefreshToken();


                    const response = await apiService.post<{ accessToken: string, refreshToken: string }>(apiGateway.user.refresh, { refreshToken });

                    if (response.data) {
                        tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);

                        const userResponse = await getCurrentUser();

                        if (userResponse?.data) setUser(userResponse.data.result);
                        else setUser(null);

                    } else {
                        // Token invalid, clear it
                        setUser(null);
                        tokenManager.clearTokens();
                    }
                }


            } catch (error) {
                console.error('Auth initialization error:', error);
                setUser(null);
                tokenManager.clearTokens();
            } 
        };

        initializeAuth();
    }, []);



    const signup = async (data: SignUpSchemaType): Promise<AxiosResponse<any, any> | undefined> => {
        const response = await Http.post(apiGateway.user.signUp, data);

        response?.status === 200 ? setUser(response.data.result) : setUser(null);
        return response

    }

    const login = async (data: LoginFormFields): Promise<AxiosResponse<any, any> | undefined> => {
        const response = await Http.post(apiGateway.user.sigIn, data)


        if (response && response?.status === 200) {
            const { accessToken, refreshToken, user } = response.data
            tokenManager.setTokens(accessToken, refreshToken);


            setUser(user)
        }
        else setUser(null);

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