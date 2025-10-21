export default function handleDeleteCard(cardName, sessionData, setSessionData) {
  const updatedArray = sessionData.avaliableProducts.filter((card) => card.name !== cardName);
  const updatedData = { ...sessionData, avaliableProducts: updatedArray };
  setSessionData(updatedData);
  localStorage.setItem("sessionData", JSON.stringify(updatedData));
}
