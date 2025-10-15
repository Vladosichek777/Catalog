import { Button, Box, Typography, Stack } from "@mui/material";
import ProductCard from "../components/Card";
import products from "../data/products.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainPage() {
  const isAdmin = JSON.parse(localStorage.getItem("sessionData")).activeUser === "admin";
  console.log(isAdmin);
  return (
    <Box sx={{ border: "2px solid blue" }}>
      {isAdmin && (
        <Button variant="contained" size="large" color="success">
          Add new Card
        </Button>
      )}
      <Box sx={{ border: "2px solid orange", mt: 5 }}>
        <Swiper
          // install Swiper modules
          modules={[Pagination, Grid]}
          spaceBetween={30}
          slidesPerView={4}
          grid={{
            rows: 2,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {products.map((card, id) => (
            <SwiperSlide>
              <ProductCard key={id} cardName={card.name} description={card.description} src={card.src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default MainPage;
