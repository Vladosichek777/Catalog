import { Navigate } from "react-router-dom";
import { useSessionStore } from "../store/sessionStore";

type ProtectedRoleProps = {
    role: string;
    children: React.ReactNode;
};

function ProtectedRole({ role, children }: ProtectedRoleProps) {
    const activeUser = useSessionStore((state) => state.activeUser)

    if (activeUser !== role) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRole;
