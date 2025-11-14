import {Button, Box, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CountBasketControl({countCurrentCardBasket, setCountCurrentCardBasket}) {
  return (
    <Box component="section" sx={{display: "flex", justifyContent: "space-between"}}>
      <Button
        onClick={() =>
          setCountCurrentCardBasket(countCurrentCardBasket > 0 ? countCurrentCardBasket - 1 : countCurrentCardBasket)
        }
      >
        <RemoveIcon />
      </Button>
      <Typography variant="h6">{countCurrentCardBasket}</Typography>
      <Button onClick={() => setCountCurrentCardBasket(countCurrentCardBasket + 1)}>
        <AddIcon />
      </Button>
    </Box>
  );
}
