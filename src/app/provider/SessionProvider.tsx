import { SessionContext } from "../../entities/sessionContext/SessionContext.ts";
import { BasketContext } from "../../entities/basketContext/BasketContext.ts";
import { type SessionData } from "../../shared/types/index.ts";
import { useState, useEffect, useMemo, useCallback } from "react";
import products from "../../shared/products.json";
import { useNavigate, useLocation } from "react-router-dom";
import { type Product } from "../../shared/types/index.ts";
import { type FormProductCardValueType } from "../../shared/types/index.ts";


type SessionProperties = {
    children: React.ReactNode;
};





export default function SessionProvider({ children }: SessionProperties): React.ReactElement {
    const navigate = useNavigate();
    const location = useLocation();



    function getfromStorage<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    // function setToStorage<T>(key: string, value: T): void {
    //     setSessionData(value as SessionData);
    //     localStorage.setItem(key, JSON.stringify(value));
    // }

    const localStorageData = getfromStorage<SessionData>("sessionData");
    const lastUser: string | undefined = localStorageData?.activeUser;

    const [sessionData, setSessionData] = useState<SessionData>(
        localStorageData ?? {
            activeUser: "",
            avaliableProducts: [...products],
            basket: []
        },
    );
    useEffect(() => {
        if ((!localStorageData || !lastUser) && location.pathname !== "/login") {
            navigate("/login", { replace: true });
            return;
        }

        if (lastUser && localStorageData) {
            setSessionData(localStorageData);
            navigate(`/${lastUser}/catalog`, { replace: true });
        }
    }, []);

    const actions = useMemo(() => ({
        login: (userName: string) => {
            setSessionData((prev) => {
                const updatedSessionData = { ...prev, activeUser: userName }
                localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
                return updatedSessionData
            })
        },

        logout: () => {
            setSessionData((prev) => {
                const updatedSessionData = { ...prev, activeUser: "" };
                localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
                return updatedSessionData
            })
            // const updatedSessionData = { ...sessionData, activeUser: "" };
            // setToStorage("sessionData", updatedSessionData);
        },

        addNewCard: (newCardData: Product) => {
            setSessionData((prev) => {
                const updatedSessionData = { ...prev, avaliableProducts: [newCardData, ...prev.avaliableProducts] };
                localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
                return updatedSessionData
            })
            // const updatedSessionData = { ...sessionData, avaliableProducts: [newCardData, ...sessionData.avaliableProducts] };
            // setToStorage("sessionData", updatedSessionData);
        },

        editCard: (updatedCardValue: FormProductCardValueType, idCard: string) => {
            // const { cardName, cardDesc, urlImage } = updatedCardValue;
            // const updatedAvaliableProducts = sessionData.avaliableProducts.map((productCard: Product) =>
            //     productCard.id === idCard
            //         ? { ...productCard, name: cardName, description: cardDesc, src: urlImage }
            //         : productCard,
            // );
            // const updatedSessionData = { ...sessionData, avaliableProducts: updatedAvaliableProducts };
            // setToStorage("sessionData", updatedSessionData);


            setSessionData((prev) => {
                const { cardName, cardDesc, urlImage } = updatedCardValue;
                const updatedAvaliableProducts = prev.avaliableProducts.map((productCard: Product) =>
                    productCard.id === idCard
                        ? { ...productCard, name: cardName, description: cardDesc, src: urlImage }
                        : productCard,
                );
                const updatedSessionData = { ...prev, avaliableProducts: updatedAvaliableProducts };
                localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
                return updatedSessionData
            })
        },

        deleteCardByAdmin: (id: string) => {
            setSessionData((prev) => {
                const filteredAvaliableProducts = prev.avaliableProducts.filter((card) => card.id !== id);
                const updatedSessionData = { ...prev, avaliableProducts: filteredAvaliableProducts };
                localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
                return updatedSessionData
            })
            // const filteredAvaliableProducts = sessionData.avaliableProducts.filter((card) => card.id !== id);
            // const updatedSessionData = { ...sessionData, avaliableProducts: filteredAvaliableProducts };
            // setToStorage("sessionData", updatedSessionData);
        }
    }), []);

    const addBasketCard = useCallback((cardId: string) => {
        setSessionData((prev) => {
            const updatedSessionData = { ...prev, basket: [...prev.basket, { id: cardId }] };
            localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
            return updatedSessionData
        })
    }, [])
    const deleteBasketCard = useCallback((id: string) => {
        setSessionData((prev) => {
            const filteredBasket = prev.basket.filter((card) => card.id !== id)
            const updatedSessionData = { ...prev, basket: filteredBasket };
            localStorage.setItem('sessionData', JSON.stringify(updatedSessionData));
            return updatedSessionData
        })
    }, [])




    const SessionContextValue = useMemo(() => ({ sessionData, actions }), [sessionData, actions]);
    const BasketContextValue = useMemo(() => ({ addBasketCard, deleteBasketCard }), [])

    return (
        <SessionContext value={SessionContextValue}>
            <BasketContext value={BasketContextValue}>
                {children}
            </BasketContext>
        </SessionContext>
    )

}

