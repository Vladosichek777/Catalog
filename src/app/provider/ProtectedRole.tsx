import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../../entities/sessionContext/SessionContext";

type ProtectedRoleProps = {
    role: string;
    children: React.ReactNode;
};

function ProtectedRole({ role, children }: ProtectedRoleProps) {
    const session = useContext(SessionContext);
    if (session.sessionData.activeUser !== role) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRole;
