import {create} from "zustand";
import {persist} from "zustand/middleware";
import {type Product, type BasketItem} from "../../shared/types/product/product";
import {type FormProductCardValueType} from "../../shared/types/index.ts";
import products from "../../shared/products.json";


export type sessionStore = {
    activeUser: string;
    availableProducts: Product[];
    basket: BasketItem[];

    login: (userName: string) => void;
    logout: () => void;
    addNewCard: (newCardData: Product) => void;
    editCard: (updatedCardValue: FormProductCardValueType, idCard: string) => void;
    deleteCardByAdmin: (idCard: string) => void;
    addBasketCard: (cardId: string) => void;
    deleteBasketCard: (id: string) => void;
};

export const useSessionStore = create<sessionStore>()(
    persist(
        (set) => ({
            activeUser: "",
            availableProducts: [...products],
            basket: [],
            login: (userName) => set({activeUser: userName}),
            logout: () => set({activeUser: ""}),
            addNewCard: (newCardData) =>
                set((state) => ({availableProducts: [newCardData, ...state.availableProducts]})),
            editCard: (updatedCardValue, idCard) =>
                set((state) => {
                    const {cardName, cardDesc, urlImage} = updatedCardValue;
                    const updatedAvailableProducts = state.availableProducts.map((productCard: Product) =>
                        productCard.id === idCard
                            ? {...productCard, name: cardName, description: cardDesc, src: urlImage}
                            : productCard,
                    );
                    return {availableProducts: updatedAvailableProducts};
                }),
            deleteCardByAdmin: (idCard) =>
                set((state) => {
                    const filteredAvailableProducts = state.availableProducts.filter((card) => card.id !== idCard);
                    return {availableProducts: filteredAvailableProducts};
                }),
            addBasketCard: (cardId) => set((state) => ({basket: [...state.basket, {id: cardId}]})),
            deleteBasketCard: (id) =>
                set((state) => {
                    const filteredBasket = state.basket.filter((card) => card.id !== id);
                    return {basket: filteredBasket};
                }),
        }),
        {name: "state"},
    ),
);


