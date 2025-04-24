import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, useContext, useEffect, useState } from "react";


export type IAgent = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    adresse: string;
    image: string;
    socials: {
        whatsApp: string;
        linkedin: string;
        twitter: string;
        instagram: string;
    }
    about: string;

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
        console.log("agentdic", agentDic);

        setAgents(agentDic);

    }

    useEffect(() => {
        fetchAgents()
    }, []);

    useEffect(() => {
        console.log('agent tbadl', agents);
    }, [agents]);
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


