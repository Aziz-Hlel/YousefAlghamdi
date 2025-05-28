// PropertySingleProvider.context.tsx
import Iproperty from '@src/models/property.type';
import Http from '@src/services/Http';
import apiGateway from '@src/utils/apiGateway';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const initialProperty: Iproperty = {
  _id: "",

  title: "",
  description: "",

  category: "",
  sub_category: "",

  city: "",
  delegation: "",
  addresse: "",

  imageGallery: {
    folderId: "",
    images: [],
  },

  listing_type: "",

  clientId: "",
  agentId: "",

  filterFields: {
    price: "0",
    area: "0",
    rooms: "0",
    bathrooms: "0",

  },
  nearestPlaces: {},
  additionalDetails: [],

  active: false,
  featured:false,
  advanced: {
    available: new Date(),
    state: "",
    updated_version: {},
  },
}


interface SinglePropertyContextType {
  property: Iproperty,
}

const SinglePropertyContext = createContext<SinglePropertyContextType | null>(null);

export function SinglePropertyProvider({ children }: { children: ReactNode }) {
  const { propertyId } = useParams()
  // const { property } = useGetProperty(propertyId);

  const [property, setProperty] = useState<Iproperty>(initialProperty);

  const updateProperty = async () => {
    // const property: Iproperty =  (await Http.get<Iproperty>(`${apiGateway.property.getById}/${id}`)).data.result;
    const response = await Http.get<Iproperty>(`${apiGateway.property.getById}/${propertyId}`);
    response?.status === 200 && delete response.data.result.advanced
    console.log("response", response);

    response && response.status === 200 && setProperty(() => ({
      ...initialProperty, // Spread the initial property to ensure all fields are included
      _id: response.data.result._id,
      title: response.data.result.title,
      description: response.data.result.description,
      category: response.data.result.category,
      sub_category: response.data.result.sub_category,
      city: response.data.result.city,
    }));
    // console.log("property", typeof property);
    // console.log(property)

    // const property: Iproperty = response.data.result

    // setProperty(property);
  };

  useEffect(() => {

    if (propertyId) updateProperty();
    if (propertyId) console.log("id tbddl fl use hook", propertyId);

  }, [propertyId]);

  useEffect(() => {
    console.log("id f provider", propertyId);
  }, [propertyId]);




  return (
    <SinglePropertyContext.Provider value={{ property }}>
      {children}
    </SinglePropertyContext.Provider>
  );
}

export function useSingleProperty() {
  const context = useContext(SinglePropertyContext);
  if (!context) {
    throw new Error('useSingleProperty must be used within a SinglePropertyProvider');
  }
  return context;
}