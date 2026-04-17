import { Slider } from "../../../entities/slider/index.ts";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { SessionContext } from "../../../entities/sessionContext/SessionContext.ts";
import { BasketContext } from "../../../entities/basketContext/BasketContext.ts";
import { ConfirmWindow } from "../../../entities/confirmWindow/index.ts";
import { useState, useCallback } from "react";
import { deleteCard } from "../../../features/deleteCardButton/index.ts";
import { BasketCard } from "../../../widgets/basketCard/index.ts";


export function Basket() {
    console.log('basket')
    const session = useContext(SessionContext);
    const { deleteBasketCard } = useContext(BasketContext);
    const isBasketEmpty = session.sessionData.basket.length === 0
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
        const cardInfo = session.sessionData.avaliableProducts.find(
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
            <Slider cardArr={session.sessionData.basket} renderCard={renderSliderCard} />
        </>
    );
}
