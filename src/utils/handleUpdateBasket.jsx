export default function handleUpdateBasket(id, description, src, cardName, sessionData, setSessionData) {
  const currentCard = { id: id, name: cardName, description: description, src: src };
  const updatedData = { ...sessionData, basket: [...sessionData.basket, currentCard] };

  setSessionData(updatedData);
  localStorage.setItem("sessionData", JSON.stringify(updatedData));
}
