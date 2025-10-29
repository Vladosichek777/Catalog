export default function handleDeleteCard(id, sessionData, setSessionData, currentUser) {
  const isAdmin = currentUser === "admin";
  const updatedBasket = sessionData.basket.filter((card) => card.id !== id);
  let updatedAvaliableProducts = sessionData.avaliableProducts.map((card) => (card.id === id ? { ...card, isBought: false } : card));

  if (isAdmin) {
    updatedAvaliableProducts = sessionData.avaliableProducts.filter((card) => card.id !== id);
  }

  const updatedData = { ...sessionData, avaliableProducts: updatedAvaliableProducts, basket: updatedBasket };

  setSessionData(updatedData);
  localStorage.setItem("sessionData", JSON.stringify(updatedData));
}
