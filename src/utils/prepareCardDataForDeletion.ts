import {type SessionContextType, type SessionData} from "./SessionContext";

type AvaliableUsers = "admin" | "user";

export default function prepareCardDataForDeletion(
    id: string,
    session: SessionContextType,
    currentUser: AvaliableUsers,
): SessionData {
    const isAdmin = currentUser === "admin";
    const updatedBasket = session.sessionData.basket.filter((card) => card.id !== id);

    let updatedAvaliableProducts = session.sessionData.avaliableProducts;

    if (isAdmin) {
        updatedAvaliableProducts = session.sessionData.avaliableProducts.filter((card) => card.id !== id);
    }

    return {
        ...session.sessionData,
        avaliableProducts: updatedAvaliableProducts,
        basket: updatedBasket,
    };
}
