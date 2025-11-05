import {Navigate, Outlet, useLocation} from "react-router-dom";

function ProtectedRole({role, activeUser}) {
  const location = useLocation();
  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  if (activeUser !== role) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return <Outlet />;
}
export default ProtectedRole;
