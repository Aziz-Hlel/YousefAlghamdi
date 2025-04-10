import Iproperty from "@src/models/property.type";
import { useAgents } from "@src/providers/AgentsProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

type IMyPropertiesContext = {
  properties: Iproperty[];
  totalCount: number;
  fetchProperties(page: number): Promise<void>;
}


const MyPropertiesContext = createContext<IMyPropertiesContext | undefined>(undefined);




const MyPropertiesProvider = ({ children }: { children: React.ReactNode }) => {

  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  console.log('tal lalalal');

  const fetchProperties = async (page?: number) => {


    const response = await Http.get(apiGateway.property.myProperties.list, { params: { page: page ?? 1 } });
    const properties: Iproperty[] = response?.data.result || [];
    const totalCount = Number(response?.headers["x-total-count"]);

    setTotalCount(totalCount);
    setProperties(properties);

  };

  useEffect(() => {
    // Fetch properties from API or any other source


    fetchProperties();

  }, []);


  return (
    <MyPropertiesContext.Provider value={{ properties, fetchProperties, totalCount }}>
      {children}
      <Outlet />
    </MyPropertiesContext.Provider>
  );


};



export const useMyPropertiesContext = () => {
  const context = useContext(MyPropertiesContext);
  if (!context) {
    throw new Error("useMyPropertiesContext must be used within a MyPropertiesProvider");
  }
  return context;
};


export default MyPropertiesProvider;