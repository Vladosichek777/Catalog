import { Button, Box, Typography, Stack } from "@mui/material";
import ProductCard from "../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainPage({ sessionData }) {
  const isAdmin = sessionData.activeUser === "admin";
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
          {sessionData.avaliableProducts.map((card, id) => (
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
