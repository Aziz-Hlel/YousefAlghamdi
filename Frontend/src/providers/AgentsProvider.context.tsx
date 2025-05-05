import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, useContext, useEffect, useState } from "react";


export type IAgent = {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
    role: string;
    phoneNumber: string;

    agentInfo: {
        image: string,
        about: string,
        socials: {
            whatsApp: string,
            instagram: string,
            twitter: string,
            linkedin: string,
        },
        address?: string,
        clientsId: string[],

    };




}



type IAgentDic = {
    [key: string]: IAgent
}

type IAgentProvider = {
    agents: IAgentDic,
    refreshAgents: () => Promise<void>
}

const AgentsContext = createContext<IAgentProvider | undefined>(undefined);



export const AgentsProvider = ({ children }: { children: React.ReactNode }) => {

    const [agents, setAgents] = useState<IAgentDic>({});

    const fetchAgents = async () => {

        const response = await Http.get(apiGateway.agent.list);
        const agentDic: IAgentDic = {}
        response?.data.result.map((agent: any) => {
            agentDic[agent._id] = agent;
        })

        setAgents(agentDic);

    }

    useEffect(() => {
        fetchAgents()
    }, []);


    return (
        <>
            <AgentsContext.Provider value={{ agents, refreshAgents: fetchAgents }}>
                {children}
            </AgentsContext.Provider >
        </>
    )

}


export const useAgents = () => {
    const context = useContext(AgentsContext);
    if (context === undefined) {
        throw new Error("useAgents must be used within an AuthProvider");
    }
    return context;

};


