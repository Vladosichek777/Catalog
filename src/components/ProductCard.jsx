import {useState, useEffect} from "react";
import handleDeleteCard from "../utils/handleDeleteCard";
import handleUpdateBasket from "../utils/handleUpdateBasket";
import CountBasketControl from "./CountBasketControl";
import useNavigation from "../utils/useNavigation";
import AdditionalCardOptionsInBasket from "./AdditionalCardOptionsInBasket";

import {Button, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Box} from "@mui/material";

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
  deleteCard,
  editCard,
}) {
  const currentCardData = {id: id, name: cardName, description: description, src: src, isBought: isBought};
  const [countCurrentCardBasket, setCountCurrentCardBasket] = useState(1);
  const [buyStatusButton, setBuyStatusButton] = useState(false);
  const {goToProductCard} = useNavigation();
  const handleClickBuyButton = () => {
    handleUpdateBasket(id, description, src, cardName, sessionData, setSessionData);
    setBuyStatusButton(true);
  };

  useEffect(() => {
    isBought ? setBuyStatusButton(true) : "";
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
            <Button onClick={() => deleteCard(id)} size="small" color="error" variant="contained">
              Delete
            </Button>
            <Button
              onClick={() => editCard(currentCardData)}
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
            <CountBasketControl
              countCurrentCardBasket={countCurrentCardBasket}
              setCountCurrentCardBasket={setCountCurrentCardBasket}
            />
            <AdditionalCardOptionsInBasket
              id={id}
              sessionData={sessionData}
              setSessionData={setSessionData}
              onDeleteCard={handleDeleteCard}
            />
          </Box>
        )}

        {!isAdmin && !inBasket && (
          <Button
            onClick={handleClickBuyButton}
            variant="contained"
            disabled={buyStatusButton}
            size="small"
            color="success"
          >
            {!buyStatusButton ? "in basket" : "Done \u2713"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
