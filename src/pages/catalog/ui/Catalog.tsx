
import { ConfirmWindow } from "../../../entities/confirmWindow/index";
import { ProductCardDialogActions } from "../../../features/productCardDialogActions/index";
import { Box } from "@mui/material";
import { useState, useCallback, } from "react";
import { useSessionStore } from "../../../app/store/sessionStore";
import { type Product } from "../../../shared/types";
import { deleteCard } from "../../../features/deleteCardButton/index";
import { Slider } from "../../../entities/slider/index";
import { CatalogCard } from "../../../widgets/catalogCard";
import { Button } from "@mui/material";



export function Catalog() {
    console.log('catalog')
    const availableProducts = useSessionStore((state) => state.availableProducts);
    const basket = useSessionStore((state) => state.basket)
    const isAdmin = useSessionStore((state) => state.activeUser === 'admin')
    const [isPopUpCardOpen, setIsPopUpCardOpen] = useState(false);
    const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
    const [currentEditCard, setCurrentEditCard] = useState<Product | null>(null);
    const [idCurrentCard, setIdCurrentCard] = useState<string | null>(null);
    const editCard = useSessionStore((state => state.editCard))
    const addNewCard = useSessionStore((state => state.addNewCard))
    const deleteCardByAdmin = useSessionStore((state => state.deleteCardByAdmin))

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
        const isInBasket: { id: string } | undefined = basket.find((basketCard) => basketCard.id === card.id);
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

            <Slider cardArr={availableProducts} renderCard={renderSliderCard} />

        </Box>
    );

}
