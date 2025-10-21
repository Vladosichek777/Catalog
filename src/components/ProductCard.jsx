import handleDeleteCard from "../utils/handleDeleteCard";
import { Button, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions } from "@mui/material";

function ProductCard({ cardName, description, src, isAdmin }) {
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
        {!isAdmin ? (
          <Button size="small" color="primary">
            in basket
          </Button>
        ) : (
          <Button onClick={() => handleDeleteCard(cardName)} size="small" color="error" variant="contained">
            Delete Card
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
