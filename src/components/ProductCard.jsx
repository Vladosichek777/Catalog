import { useState } from "react";
import handleDeleteCard from "../utils/handleDeleteCard";
import handleUpdateBasket from "../utils/handleUpdateBasket";
import { Button, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Box } from "@mui/material";

function ProductCard({ id, cardName, description, src, isAdmin, sessionData, setSessionData, inBasket }) {
  const [buy, setBuy] = useState(false);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" sx={{ height: { xs: 50, sm: 150, lg: 200 } }} image={src} alt={description} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isAdmin && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => handleDeleteCard(id, sessionData, setSessionData, "avaliableProducts")} size="small" color="error" variant="contained">
              Delete
            </Button>
            <Button size="small" color="warning" variant="outlined" sx={{ pl: 3, pr: 3 }}>
              Edit Card
            </Button>
          </Box>
        )}
        {inBasket && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => handleDeleteCard(id, sessionData, setSessionData, "basket")} size="small" color="error" variant="outlined">
              Delete
            </Button>
            <Button size="medium" color="success" variant="contained" sx={{ pl: 6, pr: 6 }}>
              Buy
            </Button>
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
            {!buy ? "in basket" : "success"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
