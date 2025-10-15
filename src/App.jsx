import { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import MainPage from "./pages/MainPage";
import useCheckLocalStorage from "./utils/useCheckLocalStorage";
import beforeUnload from "./utils/beforeUnload";
import "./App.css";

function App() {
  console.log("App render");
  const [sessionData, setSessionData] = useState({
    activeUser: "",
    avaliableProducts: [],
    basket: [],
  });

  //check active user in locale storage
  useCheckLocalStorage();
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnload(sessionData));
    return () => {
      window.removeEventListener("beforeunload", beforeUnload(sessionData));
    };
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login sessionData={sessionData} setSessionData={setSessionData} />} />
      <Route element={<MainLayout sessionData={sessionData} />}>
        <Route path="admin" element={<MainPage />} />
        <Route path="user" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
