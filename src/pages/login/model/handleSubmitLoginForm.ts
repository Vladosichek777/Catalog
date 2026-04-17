import defaultEntryValue from "../../../shared/defaultEntryValues";
import {type AvaliableUsers} from "../../../shared/defaultEntryValues";
import {type SessionContextType} from "../../../shared/types";
import {type NavigateFunction} from "react-router";

import * as z from "zod";

export const entryDataSchema = z
    .object({
        userName: z.enum(["admin", "user"], {
            message: "User name must be either 'admin' or 'user'",
        }),
        password: z.enum(["12345", "67890"], {
            message: "Password must be either '12345' or '67890'",
        }),
    })
    .refine((data) => defaultEntryValue.some((u) => u.userName === data.userName && u.password === data.password), {
        message: "Invalid user name or password",
        path: ["password"],
    });

export type EntryDataSchemaType = z.infer<typeof entryDataSchema>;

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
