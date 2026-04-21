import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { type sessionStore } from "../store/sessionStore"
function getfromStorage<T>(key: string): T | null {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      try {
            return JSON.parse(raw)[key] as T;
      } catch {
            return null;
      }
}

const localStorageData = getfromStorage<sessionStore>("state");
const lastUser: string | undefined = localStorageData?.activeUser;

type AuthComponentProps = {
      children: React.ReactNode;
};
export const AuthComponent = ({ children }: AuthComponentProps) => {
      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {
            if (!lastUser && location.pathname !== "/login") {
                  navigate("/login", { replace: true });
                  return;
            }

            if (lastUser && localStorageData) {
                  navigate(`/${lastUser}/catalog`, { replace: true });
            }
      }, []);

      return children;
};