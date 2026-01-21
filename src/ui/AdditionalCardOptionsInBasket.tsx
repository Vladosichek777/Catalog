// @ts-nocheck
import {useState, useContext} from "react";
import {SessionContext} from "../utils/SessionContext";
import prepareCardDataForDeletion from "../utils/prepareCardDataForDeletion";
import {Button} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

function AdditionalCardOptionsInBasket({id}) {
    const session = useContext(SessionContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteClick = () => {
        const updatedData = prepareCardDataForDeletion(id, session, "user");
        session.updateSessionData(updatedData);
        handleClose();
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
                <MenuItem onClick={handleDeleteClick} onClose={handleClose} sx={{color: "red"}}>
                    {" "}
                    <DeleteForeverIcon />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default AdditionalCardOptionsInBasket;
