
import { ConfirmWindow } from "../../../entities/confirmWindow/index";
import { ProductCardDialogActions } from "../../../features/productCardDialogActions/index";
import { Box } from "@mui/material";
import { useState, useContext, useCallback, } from "react";
import { SessionContext } from "../../../entities/sessionContext";
import { type Product } from "../../../shared/types";
import { deleteCard } from "../../../features/deleteCardButton/index";
import { Slider } from "../../../entities/slider/index";
import { CatalogCard } from "../../../widgets/catalogCard";
import getActiveUser from "../../../shared/utils/getActiveUser";
import { Button } from "@mui/material";



export function Catalog() {
    console.log('catalog')
    const session = useContext(SessionContext);
    const isAdmin = getActiveUser(session) === 'admin'
    const [isPopUpCardOpen, setIsPopUpCardOpen] = useState(false);
    const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
    const [currentEditCard, setCurrentEditCard] = useState<Product | null>(null);
    const [idCurrentCard, setIdCurrentCard] = useState<string | null>(null);
    const editCard = session.actions.editCard;
    const addNewCard = session.actions.addNewCard;
    const deleteCardByAdmin = session.actions.deleteCardByAdmin

    const handleCloseConfirmDeleteCard = useCallback(() => {
        setIsConfirmWindowOpen(false);
        setIdCurrentCard(null);
    }, [])

    const handleOpenConfirmWindow = useCallback((id: string) => {
        setIsConfirmWindowOpen(true);
        setIdCurrentCard(id);
    }, [])

    const handleDeleteCard = () => {
        deleteCard(idCurrentCard, deleteCardByAdmin);
    }

    const handleClosePopUpActions = useCallback(() => {
        setIsPopUpCardOpen(false);
    }, [])

    const handleAddNewCard = () => {
        setIsPopUpCardOpen(true);
    };

    const handleEditCard = useCallback((cardData: Product) => {
        setCurrentEditCard(cardData);
        setIsPopUpCardOpen(true);
    }, [])

    const clickAgreBtn = useCallback(() => {
        try {
            handleDeleteCard()
        } finally {
            handleCloseConfirmDeleteCard();
        }
    }, [idCurrentCard])

    const renderSliderCard = useCallback((card: Product) => {
        const isInBasket: { id: string } | undefined = session.sessionData.basket.find((basketCard) => basketCard.id === card.id);
        return <CatalogCard
            cardInfo={card}
            isAdmin={isAdmin}
            isInBasket={isInBasket}
            deleteCard={handleOpenConfirmWindow}
            editCard={handleEditCard} />

    }, [])

    return (
        <Box sx={{ border: "2px solid blue" }}>

            {isAdmin && <Button onClick={handleAddNewCard} variant="contained" size="large" color="success">
                Add new Card
            </Button>}

            <ProductCardDialogActions
                currentEditCard={currentEditCard}
                setCurrentEditCard={setCurrentEditCard}
                isOpen={isPopUpCardOpen}
                onClose={handleClosePopUpActions}
                editCard={editCard}
                addNewCard={addNewCard}
            />

            <ConfirmWindow
                isOpen={isConfirmWindowOpen}
                onClose={handleCloseConfirmDeleteCard}
                textMessage="Are you sure"
                textAgreeBtn="Agree"
                textDisagreeBtn="Disagree"
                handleClickAgreeBtn={clickAgreBtn}
            />

            <Slider cardArr={session.sessionData.avaliableProducts} renderCard={renderSliderCard} />

        </Box>
    );

}
