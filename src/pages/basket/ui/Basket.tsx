import { Slider } from "../../../entities/slider/index.ts";
import Typography from "@mui/material/Typography";
import { ConfirmWindow } from "../../../entities/confirmWindow/index.ts";
import { useState, useCallback } from "react";
import { deleteCard } from "../../../features/deleteCardButton/index.ts";
import { BasketCard } from "../../../widgets/basketCard/index.ts";
import { useSessionStore } from "../../../app/store/sessionStore.ts"


export function Basket() {
    console.log('basket')
    const availableProducts = useSessionStore((state) => state.availableProducts);
    const basket = useSessionStore((state) => state.basket)
    const deleteBasketCard = useSessionStore((state) => state.deleteBasketCard)
    const isBasketEmpty = basket.length === 0
    const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
    const [idCurrentCard, setIdCurrentCard] = useState<string | null>(null);

    const handleCloseConfirmDeleteCard = useCallback(() => {
        setIsConfirmWindowOpen(false);
        setIdCurrentCard(null);
    }, [])

    const handleOpenConfirmWindow = useCallback((id: string) => {
        setIsConfirmWindowOpen(true);
        setIdCurrentCard(id);
    }, [])

    const handleDeleteCard = () => {
        deleteCard(idCurrentCard, deleteBasketCard)
    }
    const clickAgreBtn = useCallback(() => {
        try {
            handleDeleteCard()
        } finally {
            handleCloseConfirmDeleteCard();
        }
    }, [idCurrentCard])

    const renderSliderCard = useCallback((card: { id: string }) => {
        const cardInfo = availableProducts.find(
            (product): boolean => product.id === card.id,
        );
        return (
            cardInfo && (
                <BasketCard cardInfo={cardInfo} deleteCard={handleOpenConfirmWindow} />
            )
        )
    }, [])

    return (
        <>
            {isBasketEmpty && (
                <Typography variant="h3" align="center">
                    Basket is empty
                </Typography>
            )}

            <ConfirmWindow
                isOpen={isConfirmWindowOpen}
                onClose={handleCloseConfirmDeleteCard}
                textMessage="Are you sure"
                textAgreeBtn="Agree"
                textDisagreeBtn="Disagree"
                handleClickAgreeBtn={clickAgreBtn}
            />
            <Slider cardArr={basket} renderCard={renderSliderCard} />
        </>
    );
}
