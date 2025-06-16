




import Http from '@src/services/Http';
import apiGateway from '@src/utils/apiGateway';
import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from 'react';

export interface Sponsor {
    _id: string;
    name: string;
    image: {
        key: string,
        url: string,
    }
    url: string;
}

interface SponsorsContextProps {
    sponsors: Sponsor[];
    totalCount: number;
    getSponsors: (page?: number) => void;
    listRef: RefObject<HTMLDivElement | null>;

}



const SponsorsContext = createContext<SponsorsContextProps | undefined>(undefined);



const SponsorsProvider = ({ children }: { children: React.ReactNode }) => {


    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const listRef = useRef<HTMLDivElement | null>(null);

    const getSponsors = async (page?: number) => {

        if (listRef?.current) {
            const offset = 100; // Adjust this value to scroll a bit further
            const elementTop = listRef.current.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementTop - offset,
                behavior: 'smooth',
            });
        }

        const response = await Http.get(apiGateway.sponsor.get, { params: { page: page ?? 1, limit: 6 } });
        response?.headers["x-total-count"] && setTotalCount(Number(response?.headers["x-total-count"]));
        response?.status === 200 && setSponsors(response.data.result);
        response?.status !== 200 && console.error("Error fetching sponsors");

    };


    useEffect(() => {
        getSponsors()
    }, [])


    const values = {
        sponsors,
        totalCount,
        getSponsors,
        listRef,
    }
useEffect(() => {
    console.log('sponsors wallew : ', sponsors);
    console.log('len sponsors : ', sponsors.length);
    
    
}, [sponsors])

    return (
        <SponsorsContext.Provider value={values}>
            {children}
        </SponsorsContext.Provider>
    )

}




export const useSponsorsContext = () => {
    const context = useContext(SponsorsContext);
    if (!context) {
        throw new Error("useSponsorsContext must be used within a SponsorsContext");
    }
    return context;
};


export default SponsorsProvider;