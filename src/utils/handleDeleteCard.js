export default function handleDeleteCard(id, sessionData, setSessionData, filterArray) {
  console.log(sessionData);
  console.log(id);
  const updatedArray = sessionData[filterArray].filter((card) => card.id !== id);
  const updatedData = { ...sessionData, [filterArray]: updatedArray };
  setSessionData(updatedData);
  localStorage.setItem("sessionData", JSON.stringify(updatedData));
}
