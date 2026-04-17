export type AvaliableUsers = "admin" | "user";

type defaultEntryValueType = {userName: AvaliableUsers; password: "12345" | "67890"}[];
const defaultEntryValue: defaultEntryValueType = [
    {userName: "admin", password: "12345"},
    {userName: "user", password: "67890"},
];

export default defaultEntryValue;
