import {createContext} from "react";
import products from "../data/products.json";

export type Product = {
    id: string;
    name: string;
    description: string;
    src: string;
};
export type BasketItem = {
    id: string;
};

export type SessionData = {
    activeUser: string;
    avaliableProducts: Product[];
    basket: BasketItem[];
};

export type SessionContextType = {
    sessionData: SessionData;
    updateSessionData: (newData: SessionData) => void;
};

export const SessionContext = createContext<SessionContextType>({
    sessionData: {
        activeUser: "",
        avaliableProducts: [...products],
        basket: [],
    },
    updateSessionData: () => {},
});

export default SessionContext;
