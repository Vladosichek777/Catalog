import { useState, memo, useEffect, useContext } from "react";
import { BasketContext } from "../../../entities/basketContext";
import { Product } from "../../../entities/product";
import { DeleteCardButton } from "../../../features/deleteCardButton/index"
import { type CatalogCardType, } from "../../../shared/types/index";
import { EditCardButton } from "../../../features/editCardButton";
import { AddToBasketButton } from "../../../features/addToBasketButton";
import { handleClickBuyButton } from "../../../features/addToBasketButton";



export const CatalogCard = memo((props: CatalogCardType) => {
    console.log('catalog card')
    const { addBasketCard } = useContext(BasketContext)
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

