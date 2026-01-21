import {type SessionContextType} from "./SessionContext";

export default function checkIsAdmin(session: SessionContextType): boolean {
    return session.sessionData.activeUser === "admin";
}
