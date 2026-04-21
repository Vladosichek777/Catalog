import {type AvaliableUsers} from "./defaultEntryValues";
import {type NavigateFunction} from "react-router";
import {useSessionStore} from "../../../app/store/sessionStore";
import {type EntryDataSchemaType} from "./entrySchema";

export function handleSubmitLoginForm(
    entryData: EntryDataSchemaType,
    navigate: NavigateFunction,
) {
    const role = entryData.userName;
    const login = useSessionStore.getState().login;
    login(role);
    const route = `/${role as AvaliableUsers}/catalog`;
    navigate(route, {replace: true});
}
