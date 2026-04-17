import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type QuantityControlRType = {
      productQuantityInBasket: number,
      setProductQuantityInBasket: React.Dispatch<React.SetStateAction<number>>
}

export function QuantityControl({ productQuantityInBasket, setProductQuantityInBasket }: QuantityControlRType) {
      return (
            <Box component="section" sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                        onClick={() =>
                              setProductQuantityInBasket(
                                    productQuantityInBasket > 0 ? productQuantityInBasket - 1 : productQuantityInBasket,
                              )
                        }
                  >
                        <RemoveIcon />
                  </Button>
                  <Typography variant="h6">{productQuantityInBasket}</Typography>
                  <Button onClick={() => setProductQuantityInBasket(productQuantityInBasket + 1)}>
                        <AddIcon />
                  </Button>
            </Box>
      )
}