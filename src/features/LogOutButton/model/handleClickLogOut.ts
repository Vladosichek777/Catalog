import {type NavigateFunction} from "react-router-dom";
import {useSessionStore} from "../../../app/store/sessionStore";

export const handleClickLogOut = ( navigate: NavigateFunction) => {
    const logout = useSessionStore.getState().logout;
    logout();
    navigate("/login", {replace: true});
};
