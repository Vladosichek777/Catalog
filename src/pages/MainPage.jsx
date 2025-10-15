import { Button, Box, Typography, Stack, Pagination } from "@mui/material";
import ProductCard from "../components/Card";
import products from "../data/products.json";

function MainPage() {
  const isAdmin = JSON.parse(localStorage.getItem("userData")).activeUser === "admin";
  console.log(isAdmin);
  return (
    <Box sx={{ border: "2px solid blue" }}>
      {isAdmin && (
        <Button variant="contained" size="large" color="success">
          Add new Card
        </Button>
      )}
      <Box sx={{ border: "2px solid orange", height: "80vh", mt: 5, overflow: "hidden" }}>
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
          {products.map((card, id) => {
            return <ProductCard key={id} cardName={card.name} description={card.description} src={card.src} />;
          })}
        </Stack>
      
      </Box>
    </Box>
  );
}

export default MainPage;
