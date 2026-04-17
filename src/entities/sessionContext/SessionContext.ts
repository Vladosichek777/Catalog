import {createContext} from "react";
import products from "../../shared/products.json";
import {type SessionContextType} from "../../shared/types";

export const SessionContext = createContext<SessionContextType>({
    sessionData: {
        activeUser: "",
        avaliableProducts: [...products],
        basket: [],
    },
    actions: {
        login: () => {},
        logout: () => {},
        addNewCard: () => {},
        editCard: () => {},
        deleteCardByAdmin: () => {},
    },
});
