import { useState, useEffect } from "react";
import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import MainPage from "./pages/MainPage";
import useCheckLocalStorage from "./utils/useCheckLocalStorage";
import "./App.css";

function App() {
  console.log("App render");
  const [products, setPoducts] = useState({ product: [] });
  //check active user in locale storage
  useCheckLocalStorage();

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="admin" element={<MainPage />} />
        <Route path="user" element={<MainPage />} />
      </Route>
    </Routes>
  );
}

export default App;
