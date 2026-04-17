

export type Product = {
    id: string;
    name: string;
    description: string;
    src: string;
};
export type CatalogCardType = {
    cardInfo: Product;
    isAdmin: boolean;
    isInBasket: {id: string} | undefined;
    deleteCard: (id: string) => void;
    editCard: (card: Product) => void;
};
export type BasketItem = {
    id: string;
};
export type BasketCardType = {
    cardInfo: Product;
    deleteCard: (id: string) => void;
};
export type FormProductCardValueType = {
    urlImage: string;
    cardName: string;
    cardDesc: string;
};
