import {useState} from "react";
import {Routes, Route, Navigate, NavLink} from "react-router-dom";
import Login from "./pages/Login";
import Basket from "./pages/Basket";
import MainLayout from "./components/MainLayout";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
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
  const isAdmin = sessionData.activeUser === "admin";
  useNavigateFirstEntry(localStorageData, setSessionData);
  console.log("app render ");

  return (
    <Routes>
      <Route
        path="login"
        element={
          <Login sessionData={sessionData} setSessionData={setSessionData} localStorageData={localStorageData} />
        }
      />
      <Route
        element={
          <MainLayout
            isAdmin={isAdmin}
            activeUser={activeUser}
            sessionData={sessionData}
            setSessionData={setSessionData}
          />
        }
      >
        <Route element={<ProtectedRole role="admin" activeUser={activeUser} />}>
          <Route
            path="admin"
            element={<MainPage sessionData={sessionData} setSessionData={setSessionData} isAdmin={isAdmin} />}
          />
        </Route>
        <Route element={<ProtectedRole role="user" activeUser={activeUser} />}>
          <Route
            path="user"
            element={<MainPage sessionData={sessionData} setSessionData={setSessionData} isAdmin={isAdmin} />}
          />
          <Route path="user/basket" element={<Basket sessionData={sessionData} setSessionData={setSessionData} />} />
        </Route>
      </Route>
      <Route path=":role/productCard/:id" element={<ProductPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
