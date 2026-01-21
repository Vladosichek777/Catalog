import {useState, useEffect} from "react";
import handleUpdateBasket from "../utils/handleUpdateBasket.ts";
import CountBasketControl from "./CountBasketControl";
import useNavigation from "../utils/useNavigation";
import AdditionalCardOptionsInBasket from "./AdditionalCardOptionsInBasket";
import {Button, Typography, Card, CardContent, CardMedia, CardActionArea, CardActions, Box} from "@mui/material";
import {type Product, type SessionContextType, type BasketItem} from "../utils/SessionContext";

type ProductCardMain = {
    variant: "mainCard";
    cardInfo: Product;
    isAdmin: boolean;
    session: SessionContextType;
    deleteCard: (id: string) => void;
    editCard: (card: Product) => void;
};

type ProductCardBasket = {
    variant: "basketCard";
    cardInfo: Product;
    session: SessionContextType;
};

type ProductCardProps = ProductCardMain | ProductCardBasket;

function ProductCard(props: ProductCardProps) {
    // Generall Info
    const {cardInfo, session} = props;
    const {id, name, description, src} = cardInfo;
    const isInBasket: {id: string} | undefined = session.sessionData.basket.find((card: BasketItem) => card.id === id);
    const [buyStatusButton, setBuyStatusButton] = useState<boolean>(false);
    const {goToProductCard} = useNavigation();

    useEffect(() => {
        if (isInBasket) {
            setBuyStatusButton(true);
        } else {
            setBuyStatusButton(false);
        }
    }, [session.sessionData.basket, isInBasket]);

    if (props.variant === "mainCard") {
        const {isAdmin, deleteCard, editCard} = props;
        const currentCardData: Product = {id: id, name: name, description: description, src: src};

        const handleClickBuyButton = () => {
            const updatedData = handleUpdateBasket(id, session.sessionData);
            session.updateSessionData(updatedData);
            setBuyStatusButton(true);
        };

        return (
            <Card sx={{maxWidth: 500}}>
                <CardActionArea>
                    <CardMedia
                        onClick={() => goToProductCard(id)}
                        component="img"
                        sx={{height: {xs: 50, sm: 150, lg: 200}}}
                        image={src}
                        alt={description}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
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
                    {!isAdmin && (
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

    if (props.variant === "basketCard") {
        const [countCurrentCardBasket, setCountCurrentCardBasket] = useState<number>(1);
        return (
            <Card sx={{maxWidth: 500}}>
                <CardActionArea>
                    <CardMedia
                        onClick={() => goToProductCard(id)}
                        component="img"
                        sx={{height: {xs: 50, sm: 150, lg: 200}}}
                        image={src}
                        alt={description}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" sx={{color: "text.secondary"}}>
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
                        <Button size="small" color="success" variant="contained" sx={{pl: 6, pr: 6}}>
                            Buy
                        </Button>
                        <CountBasketControl
                            countCurrentCardBasket={countCurrentCardBasket}
                            setCountCurrentCardBasket={setCountCurrentCardBasket}
                        />
                        <AdditionalCardOptionsInBasket id={id} />
                    </Box>
                </CardActions>
            </Card>
        );
    }
}

export default ProductCard;
