import {createContext} from "react";
import {type BasketContextType} from "../../shared/types";

export const BasketContext = createContext<BasketContextType>({
    addBasketCard: () => {},
    deleteBasketCard: () => {},
});
