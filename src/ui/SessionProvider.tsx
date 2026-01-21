import SessionContext, {type SessionData} from "../utils/SessionContext.ts";
import {useState, useEffect} from "react";
import products from "../data/products.json";
import {useNavigate, useLocation} from "react-router-dom";

type SessionProperties = {
    children: React.ReactNode;
};

export default function SessionProvider({children}: SessionProperties): React.ReactElement {
    const navigate = useNavigate();
    const location = useLocation();

    function getfromStorage<T>(key: string): T | null {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        try {
            return JSON.parse(raw) as T;
        } catch {
            return null;
        }
    }

    const localStorageData = getfromStorage<SessionData>("sessionData");
    const lastUser: string | undefined = localStorageData?.activeUser;

    const [sessionData, setSessionData] = useState<SessionData>(
        localStorageData ?? {
            activeUser: "",
            avaliableProducts: [...products],
            basket: [],
        },
    );

    const updateSessionData = (newData: SessionData): void => {
        setSessionData(newData);
        localStorage.setItem("sessionData", JSON.stringify(newData));
    };

    useEffect(() => {
        if ((!localStorageData || !lastUser) && location.pathname !== "/login") {
            navigate("/login", {replace: true});
            return;
        }

        if (lastUser && localStorageData) {
            setSessionData(localStorageData);
            navigate(`/${lastUser}/catalog`, {replace: true});
        }
    }, []);

    return <SessionContext.Provider value={{sessionData, updateSessionData}}>{children}</SessionContext.Provider>;
}
