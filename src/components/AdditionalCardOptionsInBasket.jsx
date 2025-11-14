import {useState} from "react";
import {Button} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

function AdditionalCardOptionsInBasket({id, sessionData, setSessionData, onDeleteCard}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon></MoreVertIcon>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        slots={{transition: Fade}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            onDeleteCard(id, sessionData, setSessionData, "user");
          }}
          onClose={handleClose}
          sx={{color: "red"}}
        >
          {" "}
          <DeleteForeverIcon />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AdditionalCardOptionsInBasket;
