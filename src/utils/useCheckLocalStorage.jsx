import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useCheckLocalStorage() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("inside check locale storage app");

  useEffect(() => {
    const localStorageData = localStorage.getItem("userData");
    if (!localStorageData && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);
}
