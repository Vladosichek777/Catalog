export function handleClickBuyButton(
    cardId: string,
    addToBasket: (cardId: string) => void,
    setStatusBuyButton: (value: React.SetStateAction<boolean>) => void,
) {
    addToBasket(cardId);
    setStatusBuyButton(true);
}
