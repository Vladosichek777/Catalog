function beforeUnload(sessionData) {
  localStorage.setItem("sessionData", JSON.stringify(sessionData));
}

export default beforeUnload;
