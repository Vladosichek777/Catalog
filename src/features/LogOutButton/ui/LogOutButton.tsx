import { MenuItem } from "@mui/material";
import { handleClickLogOut } from "../model/handleClickLogOut";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { SessionContext } from "../../../entities/sessionContext";

export function LogOutButton() {
    const session = useContext(SessionContext);
    const navigate = useNavigate();

    return (
        <MenuItem onClick={() => handleClickLogOut(session, navigate)} sx={{ color: "red" }}>
            Log out
        </MenuItem>
    );
}
