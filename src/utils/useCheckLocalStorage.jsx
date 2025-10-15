import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useCheckLocalStorage() {
  console.log("inside router function");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localStorageData = localStorage.getItem("sessionData");
    const lastUser = JSON.parse(localStorageData)?.activeUser;

    !localStorageData && navigate("/login", { replace: true });
    lastUser && navigate(`/${lastUser}`, { replace: true });
  }, [location.pathname, navigate]);
}
