import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import MainPage from "./pages/MainPage";
import useNavigateFirstEntry from "./utils/useNavigateFirstEntry";
import products from "./data/products.json";
import ProtectedRole from "./components/ProtectedRole";

import "./App.css";

function App() {
  const localStorageData = JSON.parse(localStorage.getItem("sessionData"));
  const activeUser = localStorageData?.activeUser;
  const [sessionData, setSessionData] = useState({
    activeUser: "",
    avaliableProducts: [...products],
    basket: [],
  });
  useNavigateFirstEntry(sessionData, setSessionData);

  console.log(sessionData);
  console.log("app render ");
  return (
    <Routes>
      <Route path="login" element={<Login sessionData={sessionData} setSessionData={setSessionData} />} />
      <Route element={<MainLayout sessionData={sessionData} setSessionData={setSessionData} />}>
        <Route element={<ProtectedRole role="admin" activeUser={activeUser} />}>
          <Route path="admin" element={<MainPage sessionData={sessionData} />} />
        </Route>
        <Route element={<ProtectedRole role="user" activeUser={activeUser} />}>
          <Route path="user" element={<MainPage sessionData={sessionData} />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
