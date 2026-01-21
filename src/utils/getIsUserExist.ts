import defaultEntryValue from "../data/defaultEntryValues.ts";
import {type EntryDataType} from "../pages/Login.tsx";

const getIsUserExist = (entryData: EntryDataType): boolean => {
    return defaultEntryValue.some(
        (currentUser: EntryDataType) =>
            currentUser.userName === entryData.userName && currentUser.password === entryData.password,
    );
};

export default getIsUserExist;
