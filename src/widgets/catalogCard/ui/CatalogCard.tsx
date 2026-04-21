import { useState, memo, useEffect } from "react";
import { Product } from "../../../entities/product";
import { DeleteCardButton } from "../../../features/deleteCardButton/index"
import { type CatalogCardType, } from "../../../shared/types/index";
import { EditCardButton } from "../../../features/editCardButton";
import { AddToBasketButton } from "../../../features/addToBasketButton";
import { handleClickBuyButton } from "../../../features/addToBasketButton";
import { useSessionStore } from "../../../app/store/sessionStore";




export const CatalogCard = memo((props: CatalogCardType) => {
    console.log('catalog card')
    const addBasketCard = useSessionStore((state) => state.addBasketCard)
    const { cardInfo, isAdmin, isInBasket, deleteCard, editCard } = props;
    const { id, name, description, src } = cardInfo;
    const [statusBuyButton, setStatusBuyButton] = useState(false)

    useEffect(() => {
        if (isInBasket) {
            setStatusBuyButton(true)
        } else {
            setStatusBuyButton(false)
        }
    }, [isInBasket])

    return (
        <Product imgSrc={src} description={description} cardName={name}>
            {isAdmin && (
                <>
                    <DeleteCardButton onDelete={deleteCard} id={id} />
                    <EditCardButton onEdit={editCard} cardData={cardInfo} />
                </>
            )}
            {!isAdmin && (
                <AddToBasketButton onClick={() => handleClickBuyButton(id, addBasketCard, setStatusBuyButton)}
                    statusBuyButton={statusBuyButton} />
            )}
        </Product>
    )

})

