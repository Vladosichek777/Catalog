import {type SessionContextType} from "../types/Storage/Storage";

export default function getActiveUser(session: SessionContextType) {
    return session.sessionData.activeUser;
}
