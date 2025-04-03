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




    return (
        <AuthContext.Provider value= {{ user: null, login: () => { }, logout: () => { } }
}>
    { children }
    </AuthContext.Provider>
    )
}