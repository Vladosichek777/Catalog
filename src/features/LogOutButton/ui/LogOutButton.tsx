import { MenuItem } from "@mui/material";
import { handleClickLogOut } from "../model/handleClickLogOut";
import { useNavigate } from "react-router";

export function LogOutButton() {
    const navigate = useNavigate();

    return (
        <MenuItem onClick={() => handleClickLogOut(navigate)} sx={{ color: "red" }}>
            Log out
        </MenuItem>
    );
}
