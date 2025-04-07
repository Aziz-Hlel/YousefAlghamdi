import Iproperty from "@src/models/property.type";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, useContext, useEffect, useState } from "react";

type IMyPropertiesContext = {
  properties: Iproperty[];
  totalCount: number;
  fetchProperties(page: number): Promise<void>;
}


const MyPropertiesContext = createContext<IMyPropertiesContext | undefined>(undefined);



const MyPropertiesProvider = ({ children }: { children: React.ReactNode }) => {

  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [totalCount, setTotalCount] = useState(0);

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
    <MyPropertiesContext.Provider value={{ properties, fetchProperties,totalCount }}>
      {children}
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