// @ts-nocheck
import {Navigate} from "react-router-dom";
import {useContext} from "react";
import SessionContext from "../utils/SessionContext";

function ProtectedRole({role, children}) {
    const session = useContext(SessionContext);
    if (session.sessionData.activeUser !== role) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRole;
