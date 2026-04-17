import {type NavigateFunction} from "react-router-dom";
import {type Location} from "react-router-dom";
import {type SessionContextType} from "../../../shared/types";

export const handleOpenBasket = (session: SessionContextType, navigate: NavigateFunction, location: Location) => {
    if (location.pathname.endsWith("/basket")) return;
    const path = `/${session.sessionData.activeUser}/basket`;
    navigate(path);
};
