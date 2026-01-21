import {type SessionData} from "./SessionContext";


export default function handleUpdateBasket(id: string, sessionData: SessionData): SessionData {
    return {
        ...sessionData,
        basket : [...sessionData.basket, {id: id}],
    };
}
