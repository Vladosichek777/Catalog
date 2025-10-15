function updateLocalStorage(sessionData) {
  localStorage.setItem("sessionData", JSON.stringify({ ...sessionData, activeUser: "" }));
}

export default updateLocalStorage;
