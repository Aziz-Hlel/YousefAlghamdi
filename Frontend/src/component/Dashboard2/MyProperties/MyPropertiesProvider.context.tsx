import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, useContext, useEffect, useState } from "react";




const MyPropertiesContext = createContext({});



const MyPropertiesProvider = ({ children }: { children: React.ReactNode }) => {

  const [properties, setProperties] = useState([]);
  const totalCount: number = properties.length || 0;



  useEffect(() => {
    // Fetch properties from API or any other source
    const fetchProperties = async () => {
      // Simulate an API call
      
      const response = await Http.get(apiGateway.property.myProperties.list);
      const properties = response?.data.result || [];
      setProperties(properties);

      const totalCount = Number(response?.headers["x-total-count"]);
    };

    fetchProperties();
  }, [])

  return (
    <MyPropertiesContext.Provider value={{}}>
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