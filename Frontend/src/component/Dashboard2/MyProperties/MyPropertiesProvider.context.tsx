import Iproperty from "@src/models/property.type";
import { IUser } from "@src/providers/AuthProvider.context";
import Http from "@src/services/Http";
import apiGateway from "@src/utils/apiGateway";
import { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";


// export type IpropertyWithUserInfo = Iproperty & {
//   clientId: IUser;
// };

type IMyPropertiesContext = {
  properties: Iproperty[] 
  totalCount: number;
  fetchProperties(page: number): Promise<void>;
  listRef: RefObject<HTMLDivElement | null>;
}


const MyPropertiesContext = createContext<IMyPropertiesContext | undefined>(undefined);




const MyPropertiesProvider = ({ children, title }: { children: React.ReactNode, title: "Pending Properties" | "My properties" | "Unavailable Properties" | "All Properties" }) => {

  const [properties, setProperties] = useState<Iproperty[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);


  const fetchProperties = async (page?: number) => {

    if (listRef?.current) {
      const offset = 100; // Adjust this value to scroll a bit further
      const elementTop = listRef.current.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    }

    const titleTourl = {
      "Pending Properties": apiGateway.property.pendingProperties.list,
      "My properties": apiGateway.property.myProperties.list,
      "Unavailable Properties": apiGateway.property.unavailableProperties.list,
      "All Properties": apiGateway.property.all_properties,
    }
    const url = titleTourl[title]

    const response = await Http.get(url, { params: { page: page ?? 1 } });

    const properties: Iproperty[] = response?.data.result || [];
    const totalCount = Number(response?.headers["x-total-count"]);

    setTotalCount(totalCount);
    setProperties(properties);

  };

  useEffect(() => {
    // Fetch properties from API or any other source


    fetchProperties();

  }, [title]);


  return (
    <MyPropertiesContext.Provider value={{ properties, fetchProperties, totalCount, listRef }}>
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