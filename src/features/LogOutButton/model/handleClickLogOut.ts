import {type SessionContextType} from "../../../shared/types";
import {type NavigateFunction} from "react-router-dom";

export const handleClickLogOut = (session: SessionContextType, navigate: NavigateFunction) => {
    session.actions.logout();
    navigate("/login", {replace: true});
};
