import { useState } from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";

function MainLayout() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget); // запоминаем, где кликнули
  };
  const handleCloseMenu = () => {
    setAnchorEl(null); // закрываем меню
  };
  const open = Boolean(anchorEl); // флаг — открыто ли меню
  return (
    <Container maxWidth="lg" sx={{ outline: "5px solid red" }}>
      <Box>
        <AppBar position="static" sx={{width:'100%'}}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4">My app</Typography>
            </Box>
            <IconButton onClick={handleOpenMenu} id="basic-button" aria-haspopup="true" aria-expanded={open ? "true" : undefined} aria-controls={open ? "basic-menu" : undefined}>
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
              <MenuItem onClick={handleCloseMenu}>Log out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </Container>
  );
}

export default MainLayout;
