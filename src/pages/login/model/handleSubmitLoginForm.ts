import {type AvaliableUsers} from "./defaultEntryValues";
import {type SessionContextType} from "../../../shared/types";
import {type NavigateFunction} from "react-router";

import {type EntryDataSchemaType} from "./entrySchema";

export function handleSubmitLoginForm(
    entryData: EntryDataSchemaType,
    session: SessionContextType,
    navigate: NavigateFunction,
) {
    const role = entryData.userName;
    session.actions.login(role);
    const route = `/${role as AvaliableUsers}/catalog`;
    navigate(route, {replace: true});
}
