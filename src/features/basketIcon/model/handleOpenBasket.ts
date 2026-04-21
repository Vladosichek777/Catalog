import {type NavigateFunction} from "react-router-dom";
import {type Location} from "react-router-dom";
import {useSessionStore} from "../../../app/store/sessionStore";

export const handleOpenBasket = (navigate: NavigateFunction, location: Location) => {
    const activeUser = useSessionStore.getState().activeUser;
    if (location.pathname.endsWith("/basket")) return;
    const path = `/${activeUser}/basket`;
    navigate(path);
};
