import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";
import ProductCard from "../components/ProductCard";
import Typography from "@mui/material/Typography";

export default function Basket({sessionData, setSessionData}) {
  const isBasketEmpty = sessionData.basket.length === 0;

  return (
    <>
      {isBasketEmpty && (
        <Typography variant="h3" align="center">
          Basket is epmty
        </Typography>
      )}
      <Swiper
        modules={[Pagination, Grid]}
        spaceBetween={30}
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        pagination={{clickable: true}}
        scrollbar={{draggable: true}}
      >
        {sessionData.basket.map((card, id) => (
          <SwiperSlide>
            <ProductCard
              key={id}
              id={card.id}
              sessionData={sessionData}
              setSessionData={setSessionData}
              cardName={card.name}
              description={card.description}
              src={card.src}
              inBasket={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
