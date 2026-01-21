// @ts-nocheck
import {useState, useContext} from "react";
import {SessionContext} from "../utils/SessionContext";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import {Menu, MenuItem} from "@mui/material";
import checkIsAdmin from "../utils/checkIsAdmin";
import getActiveUser from "../utils/getActiveUser";

function MainLayout() {
    const session = useContext(SessionContext);
    const countProductBasket = session.sessionData.basket.length;
    const activeUser = getActiveUser(session);
    const isAdmin = checkIsAdmin(session);

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickLogOut = () => {
        const newData = {...session.sessionData, activeUser: ""};
        session.updateSessionData(newData);
        navigate("login", {replace: true});
    };
    const handleOpenBasket = () => {
        if (location.pathname.endsWith("/basket")) return;
        navigate(`/${session.sessionData.activeUser}/basket`);
    };

    return (
        <Container maxWidth="lg" sx={{outline: "5px solid red"}}>
            <Box>
                <AppBar position="static" sx={{width: "100%"}}>
                    <Toolbar sx={{justifyContent: "flex-end"}}>
                        <Box sx={{flexGrow: 1}}>
                            <Typography variant="h4">My app</Typography>
                        </Box>

                        {/* Add Basket Button for user */}
                        {!isAdmin && (
                            <IconButton onClick={handleOpenBasket}>
                                <Badge badgeContent={countProductBasket} color="secondary">
                                    <ShoppingCartIcon fontSize="large" />
                                </Badge>
                            </IconButton>
                        )}
                        <IconButton
                            onClick={handleOpenMenu}
                            id="basic-button"
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            aria-controls={open ? "basic-menu" : undefined}
                        >
                            <Avatar alt="user" fontSize="small" src="" />
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
                            <Typography color="textPrimary" variant="h6" sx={{p: 0.3}}>
                                Hello, {activeUser}
                            </Typography>
                            <MenuItem onClick={handleClickLogOut} sx={{color: "red"}}>
                                Log out
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet />
        </Container>
    );
}

export default MainLayout;
