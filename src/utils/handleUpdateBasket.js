export default function handleUpdateBasket(id, description, src, cardName, sessionData, setSessionData) {
  const currentCard = { id: id, name: cardName, description: description, src: src, isBought: true };
  const indexCurrentCard = sessionData.avaliableProducts.findIndex((card) => card.id === id);
  console.log(indexCurrentCard);
  const updatedAvaliableProducts = sessionData.avaliableProducts.map((card) => (card.id === id ? { ...card, isBought: true } : card));
  const updatedData = {
    ...sessionData,
    avaliableProducts: updatedAvaliableProducts,
    basket: [...sessionData.basket, currentCard],
  };
  setSessionData(updatedData);
  localStorage.setItem("sessionData", JSON.stringify(updatedData));
}
