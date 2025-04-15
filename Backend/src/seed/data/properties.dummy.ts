import { IAgentModel } from "../../Models/agent.model";
import { Iproperty } from "../../Models/property.model";
import { Iuser_wPassword } from "./Users.dummyData";






const createProperties = async (clients: Iuser_wPassword[], agents: IAgentModel[]): Promise<any[]> => {

    const data = (await import('./property.dummy.json')).default;

    const properties = data.map((property: any) => {
        return {
            ...property,
            clientId: clients[0]._id,
            agentId: agents[0]._id,
        }
    })


    return properties

}

export default createProperties