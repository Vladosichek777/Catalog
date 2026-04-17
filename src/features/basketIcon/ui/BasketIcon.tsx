import { handleOpenBasket } from "../model/handleOpenBasket"
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SessionContext } from "../../../entities/sessionContext";
import { useContext } from "react";

export function BasketIcon() {
    const navigate = useNavigate();
    const location = useLocation();
    const session = useContext(SessionContext);
    const countProductBasket = session.sessionData.basket.length;

    return (
        <IconButton onClick={() => handleOpenBasket(session, navigate, location)}>
            <Badge badgeContent={countProductBasket} color="secondary">
                <ShoppingCartIcon fontSize="large" />
            </Badge>
        </IconButton>
    );
}
