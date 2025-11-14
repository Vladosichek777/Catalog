import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

export default function useNavigateFirstEntry(localStorageData, setSessionData) {
  const navigate = useNavigate();
  const location = useLocation();
  const lastUser = localStorageData?.activeUser;

  useEffect(() => {
    //первый заход или юзер полностью вышел
    if ((!localStorageData || !lastUser) && location.pathname !== "/login") {
      navigate("/login", {replace: true});
      return;
    }

    //перезагрузка страницы или заново открытая вкладка, когда юзер не выходил
    if (lastUser) {
      setSessionData(localStorageData);
      navigate(`/${lastUser}`, {replace: true});
    }
  }, []);
}
