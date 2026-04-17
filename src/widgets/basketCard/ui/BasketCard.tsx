import { useState, memo } from "react";
import { Product } from "../../../entities/product";
import { QuantityControl } from "../../../features/quantityControl";
import { AdditionalBasketCardOptions } from "../../../features/additionalBasketCardOptions/ui/AdditionalBasketCardOptions";
import { type BasketCardType } from "../../../shared/types/index"



export const BasketCard = memo((props: BasketCardType) => {
      
      const { cardInfo, deleteCard } = props;
      const { id, name, description, src } = cardInfo;
      const [productQuantityInBasket, setProductQuantityInBasket] = useState(1)


      return (
            <Product imgSrc={src} description={description} cardName={name} >
                  <QuantityControl productQuantityInBasket={productQuantityInBasket} setProductQuantityInBasket={setProductQuantityInBasket} />
                  <AdditionalBasketCardOptions id={id} onDelete={deleteCard} />
            </Product>
      )

})

