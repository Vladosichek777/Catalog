import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import ProductCard from "../components/ProductCard";

export default function Basket({ sessionData, setSessionData }) {
  return (
    <Swiper
      modules={[Pagination, Grid]}
      spaceBetween={30}
      slidesPerView={4}
      grid={{
        rows: 2,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {sessionData.basket.map((card, id) => (
        <SwiperSlide>
          <ProductCard key={id} id={card.id} sessionData={sessionData} setSessionData={setSessionData} cardName={card.name} description={card.description} src={card.src} inBasket={true} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
