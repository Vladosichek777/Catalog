import NewCardPopUp from "../components/NewCardPopUp";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Button, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainPage({ sessionData, setSessionData, isAdmin }) {
  const [openModalNewCard, setOpenModalNewCard] = useState(false);
  const handleCloseModalNewCard = () => {
    setOpenModalNewCard(false);
  };
  const handleOpenModalNewCard = () => {
    setOpenModalNewCard(true);
  };

  return (
    <Box sx={{ border: "2px solid blue" }}>
      {isAdmin && (
        <Button onClick={handleOpenModalNewCard} variant="contained" size="large" color="success">
          Add new Card
        </Button>
      )}
      <NewCardPopUp open={openModalNewCard} close={handleCloseModalNewCard} sessionData={sessionData} setSessionData={setSessionData} />
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
              <ProductCard key={id} cardName={card.name} description={card.description} src={card.src} isAdmin={isAdmin} sessionData={sessionData} setSessionData={setSessionData} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default MainPage;
