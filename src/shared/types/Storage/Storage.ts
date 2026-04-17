import {type Product, type BasketItem} from "../product/product";
import {type FormProductCardValueType} from "../index";

export type SessionData = {
    activeUser: string;
    avaliableProducts: Product[];
    basket: BasketItem[];
};

export type SessionContextType = {
    sessionData: SessionData;
    actions: {
        login: (userName: string) => void;
        logout: () => void;
        addNewCard: (newCardData: Product) => void;
        editCard: (updatedCardValue: FormProductCardValueType, idCard: string) => void;
        deleteCardByAdmin: (id: string) => void;
    };
};

export type BasketContextType = {
    addBasketCard: (cardId: string) => void;
    deleteBasketCard: (id: string) => void;
};
