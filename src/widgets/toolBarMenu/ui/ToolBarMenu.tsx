import { Menu, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { AppBar } from "@mui/material";
import { BasketIcon } from "../../../features/basketIcon";
import { useState, useContext } from "react";
import getActiveUser from "../../../shared/getActiveUser";
import { SessionContext } from "../../../entities/sessionContext";

type ToolBarMenuProps = {
    children: React.ReactNode;
};

export function ToolBarMenu({ children }: ToolBarMenuProps) {
    const session = useContext(SessionContext);
    const activeUser = getActiveUser(session);
    const isAdmin = activeUser === "admin";

    //Menu block
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    //-----
    return (
        <AppBar position="static" sx={{ width: "100%" }}>
            <Toolbar sx={{ justifyContent: "flex-end" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4">My app</Typography>
                </Box>

                {!isAdmin && <BasketIcon />}
                <IconButton
                    onClick={handleOpenMenu}
                    id="basic-button"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    aria-controls={open ? "basic-menu" : undefined}
                >
                    <Avatar alt="user" src="" />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    id="basic-menu"
                    slotProps={{
                        list: {
                            "aria-labelledby": "basic-button",
                        },
                    }}
                    disableScrollLock={true}
                >
                    <Typography color="textPrimary" variant="h6" sx={{ p: 0.3 }}>
                        Hello, {activeUser}
                    </Typography>
                    {children}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
