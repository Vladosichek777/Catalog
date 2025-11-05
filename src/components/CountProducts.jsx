import {Button, Box, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CountProducts({countProducts, setCountProducts}) {
  return (
    <Box component="section" sx={{display: "flex", justifyContent: "space-between"}}>
      <Button onClick={() => setCountProducts(countProducts > 0 ? countProducts - 1 : countProducts)}>
        <RemoveIcon />
      </Button>
      <Typography variant="h6">{countProducts}</Typography>
      <Button onClick={() => setCountProducts(countProducts + 1)}>
        <AddIcon />
      </Button>
    </Box>
  );
}
