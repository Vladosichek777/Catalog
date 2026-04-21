import { handleOpenBasket } from "../model/handleOpenBasket"
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSessionStore } from "../../../app/store/sessionStore";

export function BasketIcon() {
    const navigate = useNavigate();
    const location = useLocation();

    const countProductBasket = useSessionStore((state) => state.basket).length

    return (
        <IconButton onClick={() => handleOpenBasket(navigate, location)}>
            <Badge badgeContent={countProductBasket} color="secondary">
                <ShoppingCartIcon fontSize="large" />
            </Badge>
        </IconButton>
    );
}
