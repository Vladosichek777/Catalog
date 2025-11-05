import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";

export default function useNavigateFirstEntry(setSessionData) {
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageData = JSON.parse(localStorage.getItem("sessionData"));
  const lastUser = localStorageData?.activeUser;

  useEffect(() => {
    //первый заход или юзер полностью вышел
    if ((!localStorageData || !lastUser) && location.pathname !== "/login") {
      console.log("еще нет никакого юзера, localStorageData = 0");
      navigate("/login", {replace: true});
      return;
    }

    //перезагрузка страницы или заново открытая вкладка, когда юзер не выходил
    if (lastUser) {
      console.log("повторный заход юзера");
      setSessionData(localStorageData);
      navigate(`/${lastUser}`, {replace: true});
    }
  }, []);
}
