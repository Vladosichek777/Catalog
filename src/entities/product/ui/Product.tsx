import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/material";

type ProductType = {
    children: React.ReactNode;
    imgSrc: string;
    description: string;
    cardName: string;
};

export function Product({ children, imgSrc, description, cardName }: ProductType) {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    sx={{ height: { xs: 50, sm: 150, lg: 200 } }}
                    image={imgSrc}
                    alt={description}
                />
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
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {children}
                </Box>
            </CardActions>
        </Card>
    );
}
