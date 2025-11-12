import {useState, useEffect} from "react";
import handleDeleteCard from "../utils/handleDeleteCard";
import handleUpdateBasket from "../utils/handleUpdateBasket";
import CountProducts from "./CountProducts";
import useNavigation from "../utils/useNavigation";

import {Button, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Box} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

function ProductCard({
  id,
  cardName,
  description,
  src,
  isAdmin,
  sessionData,
  setSessionData,
  inBasket,
  isBought,
  editModal,
  setCurrentEditCard,
  handleOpenConfirmWindow,
  setIdCurrentCard,
}) {
  const [countProducts, setCountProducts] = useState(1);
  const [buy, setBuy] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const currentCardData = {id: id, name: cardName, description: description, src: src, isBought: isBought};
  const {goToProductCard} = useNavigation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    isBought ? setBuy(true) : "";
  }, [isBought]);

  return (
    <Card sx={{maxWidth: 500}}>
      <CardActionArea>
        <CardMedia
          onClick={() => goToProductCard(id, isAdmin ? "admin" : "user")}
          component="img"
          sx={{height: {xs: 50, sm: 150, lg: 200}}}
          image={src}
          alt={description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardName}
          </Typography>
          <Typography variant="body2" sx={{color: "text.secondary"}}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isAdmin && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                handleOpenConfirmWindow();
                setIdCurrentCard(id);
              }}
              size="small"
              color="error"
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                editModal();
                setCurrentEditCard(currentCardData);
              }}
              size="small"
              color="warning"
              variant="outlined"
              sx={{pl: 3, pr: 3}}
            >
              Edit Card
            </Button>
          </Box>
        )}
        {inBasket && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button size="small" color="success" variant="contained" sx={{pl: 6, pr: 6}}>
              Buy
            </Button>
            <CountProducts countProducts={countProducts} setCountProducts={setCountProducts} />
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
                    handleDeleteCard(id, sessionData, setSessionData, "user");
                  }}
                  onClose={handleClose}
                  sx={{color: "red"}}
                >
                  {" "}
                  <DeleteForeverIcon />
                </MenuItem>
              </Menu>
            </div>
          </Box>
        )}
        {!isAdmin && !inBasket && (
          <Button
            onClick={() => {
              handleUpdateBasket(id, description, src, cardName, sessionData, setSessionData);
              setBuy(true);
            }}
            variant="contained"
            disabled={buy}
            size="small"
            color="success"
          >
            {!buy ? "in basket" : "Done \u2713"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
