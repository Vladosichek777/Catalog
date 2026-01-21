import {type SessionContextType} from "./SessionContext";

export default function checkBasketEmpty(session: SessionContextType): boolean {
    return session.sessionData.basket.length === 0;
}
